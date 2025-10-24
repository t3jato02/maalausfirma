import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HOURLY_RATE, PRICE_RANGES } from '../data/pricing'

export default function Urakkaarvio(){
  const navigate = useNavigate()
  const location = useLocation()
  const categories = useMemo(() => {
    return Object.entries(PRICE_RANGES).map(([key, cfg]) => ({ key, ...cfg }))
  }, [])

  const [selectedKey, setSelectedKey] = useState(categories[0]?.key || '')
  const [items, setItems] = useState([])
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedDetails, setCopiedDetails] = useState(false)
  const [includeVat, setIncludeVat] = useState(false)
  const [editing, setEditing] = useState({}) // key -> raw string while editing input
  const VAT = 0.255

  // Persist estimate per user (no login) using localStorage
  const STORAGE_KEY = 'urakkaEstimate.v1'

  // Restore on mount
  useEffect(() => {
    try {
      // 1) If URL contains a shared estimate (?est=...), prefer that
      const params = new URLSearchParams(location.search)
      const est = params.get('est')
      if (est) {
        try {
          const json = decodeURIComponent(atob(est))
          const parsed = JSON.parse(json)
          if (parsed && Array.isArray(parsed.i)){
            const restored = parsed.i
              .map((it) => {
                const cfg = PRICE_RANGES[it.k]
                if (!cfg) return null
                return { key: it.k, label: cfg.label, unit: cfg.unit, min: cfg.min, max: cfg.max, qty: Math.max(0, Number(it.q) || 0) }
              })
              .filter(Boolean)
            if (restored.length) setItems(restored)
          }
          if (parsed && typeof parsed.vt !== 'undefined') setIncludeVat(Boolean(parsed.vt))
        } catch {}
      }

      // 2) Fallback to localStorage if no share param present
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!est && raw) {
        const saved = JSON.parse(raw)
        if (Array.isArray(saved.items)) {
          const restored = saved.items
            .map((it) => {
              const cfg = PRICE_RANGES[it.key]
              if (!cfg) return null
              return { key: it.key, label: cfg.label, unit: cfg.unit, min: cfg.min, max: cfg.max, qty: Math.max(0, Number(it.qty) || 0) }
            })
            .filter(Boolean)
          if (restored.length) setItems(restored)
        }
        if (saved.selectedKey && PRICE_RANGES[saved.selectedKey]) setSelectedKey(saved.selectedKey)
        if (typeof saved.includeVat === 'boolean') setIncludeVat(!!saved.includeVat)
      }
    } catch {}
  }, [location.search])

  // Save on change
  useEffect(() => {
    try {
      const compact = { selectedKey, includeVat, items: items.map(i => ({ key: i.key, qty: i.qty })) }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compact))
    } catch {}
  }, [items, selectedKey, includeVat])

  const addItem = () => {
    if (!selectedKey) return
    if (items.some(i => i.key === selectedKey)) return
    const cfg = PRICE_RANGES[selectedKey]
    setItems(prev => [...prev, { key: selectedKey, label: cfg.label, unit: cfg.unit, min: cfg.min, max: cfg.max, qty: 0 }])
  }

  const handleQtyChange = (key, raw) => {
    setEditing(prev => ({ ...prev, [key]: raw }))
    const norm = (raw ?? '').toString().replace(',', '.')
    const num = Number(norm)
    const n = !isNaN(num) ? Math.max(0, num) : 0
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty: n } : i))
  }

  const handleQtyFocus = (key, current) => {
    setEditing(prev => ({ ...prev, [key]: current === 0 ? '' : String(current) }))
  }

  const handleQtyBlur = (key) => {
    setEditing(prev => {
      const { [key]: _, ...rest } = prev
      return rest
    })
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))

  const clearAll = () => {
    setItems([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  const buildShareUrl = () => {
    try {
      const base = `${window.location.origin}${import.meta.env.BASE_URL || '/'}`
      const data = { v: 1, vt: includeVat ? 1 : 0, i: items.map(i => ({ k: i.key, q: i.qty })) }
      const payload = btoa(encodeURIComponent(JSON.stringify(data)))
      const url = `${base.replace(/\/$/, '/') }urakka-arvio?est=${payload}`
      setShareUrl(url)
      navigator.clipboard?.writeText(url).then(() => setCopied(true)).catch(() => setCopied(false))
      return url
    } catch {
      setShareUrl('')
      setCopied(false)
      return ''
    }
  }

  const totals = items.reduce((acc, i) => {
    return { min: acc.min + i.qty * i.min, max: acc.max + i.qty * i.max }
  }, { min: 0, max: 0 })
  const totalsVat = { min: Math.round(totals.min * (1+VAT)), max: Math.round(totals.max * (1+VAT)) }

  const buildDraft = () => {
    if (!items.length) return 'Urakka-arvion luonnos: (ei rivejä)\n'
    const lines = []
    lines.push('Urakka-arvion luonnos (työ, ALV 0 %):')
    for (const i of items){
      const itemMin = Math.round(i.qty * i.min)
      const itemMax = Math.round(i.qty * i.max)
      lines.push(`- ${i.label}: ${i.qty} ${i.unit} × ${i.min}–${i.max} €/ ${i.unit} → ~${itemMin}–${itemMax} €`)
    }
    lines.push(`Yhteensä: ~${Math.round(totals.min)}–${Math.round(totals.max)} € (työ, ALV 0 %)`)
    if (includeVat) lines.push(`Verollinen yhteensä (ALV 25,5 %): ~${totalsVat.min}–${totalsVat.max} €`)
    lines.push('Huom: Arvio on karkea. Materiaalit, suojaukset ja telineet erikseen.')
    return lines.join('\n')
  }

  const handleSend = () => {
    const draft = buildDraft()
    try {
      sessionStorage.setItem('estimateDraft', draft)
    } catch {}
    navigate('/#contact')
  }

  const copyDetails = async () => {
    try {
      const draft = buildDraft()
      await navigator.clipboard?.writeText(draft)
      setCopiedDetails(true)
      setTimeout(() => setCopiedDetails(false), 2000)
    } catch {
      setCopiedDetails(false)
    }
  }

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <span className="current">Urakka-arvio</span>
        </nav>
      </div>

      <section className="services">
        <div className="container">
          <h1 className="section-title">Urakka-arvio (ALV 0 %)</h1>
          <p className="section-description">
            Valitse alla työvaiheita, syötä määrät ja laske karkea urakka-arvio työn osuudelle ilman ALV:ia.
            Materiaalit, suojaukset ja mahdolliset telineet erikseen. Arviot ovat erittäin suuntaa antavia.
          </p>

          <div className="contact-form" style={{marginBottom:'2rem'}}>
            <div className="form-group">
              <label htmlFor="cat">Lisää työvaihe</label>
              <select id="cat" value={selectedKey} onChange={e => setSelectedKey(e.target.value)} style={{width:'100%', padding:15, border:'2px solid #e0e0e0', borderRadius:10, fontSize:'1rem'}}>
                {categories.map(c => (
                  <option key={c.key} value={c.key}>{c.label} ({c.unit})</option>
                ))}
              </select>
            </div>
            <button type="button" className="submit-btn" onClick={addItem}>Lisää listaan</button>
            <div className="form-group" style={{marginTop:12}}>
              <label htmlFor="vatMode">ALV-näyttö</label>
              <select id="vatMode" value={includeVat ? '1' : '0'} onChange={e => setIncludeVat(e.target.value === '1')} style={{width:'100%', padding:12, border:'2px solid #e0e0e0', borderRadius:10}}>
                <option value="0">ALV 0 % (näytä verottomat hinnat)</option>
                <option value="1">ALV 25,5 % (näytä verolliset hinnat)</option>
              </select>
            </div>
          </div>

          {items.length > 0 && (
            <div className="services-grid" style={{marginTop:'1rem'}}>
              {items.map(i => {
                const itemMin = Math.round(i.qty * i.min)
                const itemMax = Math.round(i.qty * i.max)
                return (
                  <div className="service-card" key={i.key}>
                    <div className="service-icon">🧮</div>
                    <h3 style={{marginBottom:8}}>{i.label}</h3>
                    <div style={{display:'flex', gap:'8px', alignItems:'center', justifyContent:'center', marginBottom:8}}>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={editing[i.key] ?? (i.qty === 0 ? '' : String(i.qty))}
                        onFocus={() => handleQtyFocus(i.key, i.qty)}
                        onBlur={() => handleQtyBlur(i.key)}
                        onChange={e => handleQtyChange(i.key, e.target.value)}
                        style={{width:120, padding:10, border:'2px solid #e0e0e0', borderRadius:10}}
                        aria-label="Määrä" />
                      <span style={{color:'#6b7280'}}>{i.unit}</span>
                    </div>
                    <p style={{marginBottom:4}}>Yksikköhinta: {i.min}–{i.max} €/ {i.unit}</p>
                    {includeVat && (
                      <p style={{marginBottom:8, color:'#374151'}}>Yksikköhinta verollisena: {Math.round(i.min*(1+VAT))}–{Math.round(i.max*(1+VAT))} €/ {i.unit}</p>
                    )}
                    <p style={{fontWeight:700}}>Arvio tälle: ~{itemMin}–{itemMax} €</p>
                    {includeVat && (
                      <p style={{fontWeight:600, color:'#374151'}}>Verollinen: ~{Math.round(itemMin*(1+VAT))}–{Math.round(itemMax*(1+VAT))} €</p>
                    )}
                    <div style={{marginTop:8}}>
                      <button type="button" className="cb-btn ghost" onClick={() => removeItem(i.key)}>Poista</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="service-card" style={{marginTop:'1.5rem'}}>
            <div className="service-icon">Σ</div>
            <h3>Kokonaisarvio (työ, ALV 0 %)</h3>
            <p style={{fontSize:'1.1rem'}}>
              Yhteensä: <strong>~{Math.round(totals.min)}–{Math.round(totals.max)} €</strong>
            </p>
            {includeVat && (
              <p style={{fontSize:'1.05rem', fontWeight:700}}>Verollinen yhteensä (ALV 25,5 %): ~{totalsVat.min}–{totalsVat.max} €</p>
            )}
            <p className="cb-muted">Tuntiveloitus tyypillisesti {HOURLY_RATE.min}–{HOURLY_RATE.max} €/h ({HOURLY_RATE.note}).</p>
            <div style={{marginTop:8}}>
              <button type="button" className="cb-btn ghost" onClick={clearAll}>Tyhjennä arvio</button>
              <button type="button" className="cb-btn" style={{marginLeft:8}} onClick={buildShareUrl}>Jaa linkki</button>
              <button type="button" className="cb-btn" style={{marginLeft:8}} onClick={copyDetails}>Kopioi erittely</button>
            </div>
            {shareUrl && (
              <div className="cb-muted" style={{marginTop:8, wordBreak:'break-all'}}>
                {copied ? 'Linkki kopioitu leikepöydälle.' : 'Kopioi ja jaa tämä linkki:'}
                <div style={{marginTop:6, fontSize:'0.85rem'}}>{shareUrl}</div>
              </div>
            )}
            {copiedDetails && (
              <div className="cb-muted" style={{marginTop:8}}>Erittely kopioitu leikepöydälle.</div>
            )}
            </div>

          <div style={{textAlign:'center', marginTop:'2rem', display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
            <button type="button" className="cta-button" onClick={handleSend}>Lähetä viesti</button>
            <Link className="cta-button" to="/#contact">Pelkkä yhteydenotto</Link>
          </div>

          <p style={{marginTop:'2rem', color:'#6b7280', textAlign:'center'}}>
            Huom: Arviot koskevat työn osuutta ilman ALV:ia. Materiaalit, suojaukset ja telineet erikseen. Lopullinen hinta tarkentuu katselmuksessa.
          </p>
        </div>
      </section>
    </>
  )
}
