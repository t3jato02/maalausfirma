import { useEffect, useMemo, useRef, useState } from 'react'
import { findBestAnswer } from '../data/faqs'
import { estimatePricing, PRICE_RANGES, estimateRoomAllSurfaces } from '../data/pricing'

const PHONE = '+358400580172'
const EMAIL = 'teuvo.jarvenpaa@luukku.com'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('chat') // chat | contact
  const [messages, setMessages] = useState(() => ([
    { role: 'bot', text: 'Hei! Olen Teuvo Järvenpää Oy:n avustaja. Vastaan yleisiin kysymyksiin ja voin myös välittää viestisi yritykselle.' },
    { role: 'bot', text: 'Voin antaa myös ERITTÄIN karkean hinta-arvion. Kokeile: "Mikä on maalarin tuntiveloitus?" tai "Paljonko maksaa 50 m² sisäseinien maalaus?"' }
  ]))
  const [input, setInput] = useState('')
  const listRef = useRef(null)
  const draggingRef = useRef(false)
  const startRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ side: 'right', y: null })
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false))
  const [fabPos, setFabPos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cbFabPos')) || { side: 'right', y: null } } catch { return { side: 'right', y: null } }
  })

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => { if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight }, [messages, open])

  const config = useMemo(() => (window.CHATBOT_CONFIG||{}), [])

  const sendUser = (text) => setMessages(m => [...m, { role: 'user', text }])
  const sendBot = (text) => setMessages(m => [...m, { role: 'bot', text }])

  const onSend = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    sendUser(text)
    const { answer, confidence } = findBestAnswer(text)
    if (answer && confidence > 0) {
      sendBot(answer)
    } else {
      sendBot('En ole varma vastauksesta. Voit kysyä toisin tai siirtyä lähettämään viestin meille lomakkeella (napauta "Ota yhteyttä").')
    }
  }

  // Render bot text with simple formatting: clickable links and line breaks
  const renderBotText = (text) => {
    const urlRe = /(https?:\/\/[^\s)]+)|(www\.[^\s)]+)/gi
    const parts = String(text||'').split('\n')
    return (
      <>
        {parts.map((line, idx) => (
          <div key={idx} className="cb-line">
            {line.split(urlRe).map((chunk, i) => {
              if (!chunk) return null
              const isUrl = /^(https?:\/\/|www\.)/i.test(chunk)
              if (isUrl) {
                const href = chunk.startsWith('http') ? chunk : `https://${chunk}`
                return <a key={i} href={href} target="_blank" rel="noreferrer">{chunk}</a>
              }
              return <span key={i}>{chunk}</span>
            })}
          </div>
        ))}
      </>
    )
  }

  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' })
  const onSubmitContact = async (e) => {
    e?.preventDefault?.()
    const payload = { ...contact, source: 'chatbot', ts: new Date().toISOString() }

    // webhook preferred
    if (config.webhookUrl) {
      try {
        const res = await fetch(config.webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error('bad status '+res.status)
        sendBot('Kiitos viestistä! Otamme sinuun yhteyttä mahdollisimman pian.')
        setContact({ name: '', email: '', phone: '', message: '' })
        setMode('chat')
        return
      } catch (err) {
        console.warn('Webhook error', err)
        // fall through to mailto
      }
    }

    // mailto fallback
    const subject = encodeURIComponent('Yhteydenotto sivustolta (chatbot)')
    const body = encodeURIComponent(
      `Nimi: ${contact.name}\nSähköposti: ${contact.email}\nPuhelin: ${contact.phone}\n\nViesti:\n${contact.message}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    sendBot('Avasin sähköpostin luonnoksen. Jos se ei auennut, voit myös soittaa: 0400 580 172.')
  }

  // Quick estimate mini-form state
  const [showEstimator, setShowEstimator] = useState(false)
  const [estCat, setEstCat] = useState('sisaseinat')
  const [estQty, setEstQty] = useState('')
  const [estRoomHeight, setEstRoomHeight] = useState('2.6')
  const [estIncludeFloor, setEstIncludeFloor] = useState(true)
  const estUnit = PRICE_RANGES[estCat]?.unit || 'm²'
  const estLabel = PRICE_RANGES[estCat]?.label || 'Kohde'

  const EST_PHRASES = {
    sisaseinat: 'sisäseinien maalaus',
    sisakatot: 'sisäkaton maalaus',
    ruiskukatto: 'ruiskukaton maalaus',
    tapetointi: 'tapetointi',
    peltikatto: 'peltikaton maalaus',
    julkisivu_puu: 'puujulkisivun maalaus',
    julkisivu_rappaus: 'rapatun julkisivun maalaus',
    betonilattia: 'betonilattian maalaus/pinnoitus',
    kipsi_maalivalmis: 'kipsilevystä maalivalmiiksi (tasoitus + maalaus)',
    kipsi_ruiskukatto: 'kipsilevystä ruiskukattopintaan',
    ovi: 'ovien maalaus',
    ikkuna: 'ikkunoiden maalaus',
    huone_all: 'huoneen kaikkien pintojen maalaus'
  }

  const onEstimate = (e) => {
    e?.preventDefault?.()
    const qty = parseFloat(String(estQty).replace(',', '.'))
    if (estCat === 'huone_all') {
      if (!qty || qty <= 0) { sendBot('Syötä huoneen pohjan pinta-ala (m²), esim. 12.'); return }
      const h = parseFloat(String(estRoomHeight).replace(',', '.')) || 2.6
      sendUser(`Pyydä arvio: Huoneen kaikki pinnat – ${qty} m², seinäkorkeus ${h} m${estIncludeFloor ? ', lattia mukana' : ''}`)
      const out = estimateRoomAllSurfaces(qty, h, estIncludeFloor)
      if (out) sendBot(out)
      else sendBot('En saanut huonearviota laskettua. Kokeile eri arvoilla tai pyydä tarjous.')
    } else {
      if (!qty || qty <= 0) {
        sendBot('Syötä kelvollinen määrä arvioa varten (esim. 50 m² tai 3 kpl).')
        return
      }
      const phrase = EST_PHRASES[estCat] || estLabel
      const text = `hinta ${phrase} ${qty} ${estUnit}`
      // Echo user intent and respond with estimate
      sendUser(`Pyydä arvio: ${estLabel} – ${qty} ${estUnit}`)
      const ans = estimatePricing(text)
      if (ans) sendBot(ans)
      else sendBot('En saanut muodostettua arviota. Kokeile tarkentaa kohde ja määrä, tai pyydä tarjous.')
    }
    setShowEstimator(false)
    setEstQty('')
  }

  const quickActions = (
    <div className="cb-quick">
      <button className="cb-btn ghost" onClick={() => setShowEstimator(s => !s)}>Pyydä arvio</button>
      <button className="cb-btn ghost" onClick={() => setMode('contact')}>Ota yhteyttä</button>
      <a className="cb-btn ghost" href={`https://wa.me/${PHONE.replace(/[^0-9]/g,'')}?text=${encodeURIComponent('Hei! Tarvitsen lisätietoja / tarjouksen.')}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="cb-btn ghost" href={`sms:${PHONE}?body=${encodeURIComponent('Hei! Tarvitsen lisätietoja / tarjouksen.')}`}>SMS</a>
    </div>
  )

  // Draggable FAB for mobile: snap to left/right edges and keep within safe bounds
  const onFabPointerDown = (e) => {
    if (!isMobile || open) return
    try { e.preventDefault() } catch {}
    draggingRef.current = true
    const pt = 'touches' in e ? e.touches[0] : e
    startRef.current = { x: pt.clientX, y: pt.clientY }
    posRef.current = { ...fabPos }
    const move = (ev) => {
      if (!draggingRef.current) return
      const mv = 'touches' in ev ? ev.touches[0] : ev
      const dx = mv.clientX - startRef.current.x
      const dy = mv.clientY - startRef.current.y
      // Preview position (not persisted yet)
      const y0 = posRef.current.y !== null ? posRef.current.y : null
      const currentY = y0 !== null ? y0 + dy : null
      const preview = { side: posRef.current.side, y: currentY }
      setFabPos((prev) => ({ ...prev, ...preview }))
    }
    const up = (ev) => {
      const upPt = 'changedTouches' in ev ? ev.changedTouches[0] : ev
      const dx = upPt.clientX - startRef.current.x
      const dy = upPt.clientY - startRef.current.y
      const moved = Math.hypot(dx, dy)
      draggingRef.current = false
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('touchend', up)

      if (moved < 6) {
        setOpen(true)
        return
      }

      // Commit snap
      const vw = window.innerWidth
      const vh = window.innerHeight
      const side = (startRef.current.x + dx) < vw / 2 ? 'left' : 'right'
      const SAFE_BOTTOM = 84 // keep above contact bar
      const TOP_PAD = 16
      const btnSize = 56
      let y = (posRef.current.y !== null ? posRef.current.y : (vh - SAFE_BOTTOM - btnSize)) + dy
      y = Math.max(TOP_PAD, Math.min(vh - SAFE_BOTTOM - btnSize, y))
      const next = { side, y }
      setFabPos(next)
      try { localStorage.setItem('cbFabPos', JSON.stringify(next)) } catch {}
    }
    window.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', up, { passive: true })
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', up, { passive: true })
  }

  const onFabClick = () => {
    if (draggingRef.current) return
    setOpen(true)
  }

  return (
    <div
      className={`cb-root ${open ? 'open' : ''}`}
      style={isMobile
        ? (
            open
              // When open on mobile, ALWAYS anchor to right side, above bottom bar
              ? { right: 12, left: 'auto', bottom: 84 }
              // When closed, follow draggable FAB position (left/right, stored Y)
              : (fabPos.y === null
                  ? (fabPos.side === 'left'
                      ? { left: 12, right: 'auto', bottom: 84 }
                      : { right: 12, left: 'auto', bottom: 84 })
                  : (fabPos.side === 'left'
                      ? { left: 12, right: 'auto', top: Math.max(16, Math.min(window.innerHeight - 84 - 56, fabPos.y)) }
                      : { right: 12, left: 'auto', top: Math.max(16, Math.min(window.innerHeight - 84 - 56, fabPos.y)) })
                )
          )
        : undefined}
    >
      {!open && (
        <button className="cb-fab" aria-label="Avaa chat" onClick={onFabClick} onPointerDown={onFabPointerDown} onTouchStart={onFabPointerDown}>
          💬
        </button>
      )}

      {open && (
        <div className="cb-panel" role="dialog" aria-label="Chatbot">
          <div className="cb-header">
            <div className="cb-title">Chat • Teuvo Järvenpää Oy</div>
            <div className="cb-actions">
              <button className={`cb-tab ${mode==='chat'?'active':''}`} onClick={() => setMode('chat')}>Kysy</button>
              <button className={`cb-tab ${mode==='contact'?'active':''}`} onClick={() => setMode('contact')}>Ota yhteyttä</button>
              <button className="cb-close" aria-label="Sulje" onClick={() => setOpen(false)}>✕</button>
            </div>
          </div>

          {mode === 'chat' && (
            <>
              <div className="cb-messages" ref={listRef}>
                {messages.map((m, i) => (
                  <div key={i} className={`cb-msg ${m.role}`}>
                    {m.role === 'bot' ? renderBotText(m.text) : m.text}
                  </div>
                ))}
              </div>
              {quickActions}
              {showEstimator && (
                <form className="cb-form" onSubmit={onEstimate}>
                  <label>
                    Kohde
                    <select value={estCat} onChange={e => setEstCat(e.target.value)}>
                      <option value="huone_all">Huoneen kaikki pinnat (pohjan m²)</option>
                      {Object.entries(PRICE_RANGES).map(([id, cfg]) => (
                        <option key={id} value={id}>{cfg.label} ({cfg.unit})</option>
                      ))}
                    </select>
                  </label>
                  {estCat === 'huone_all' ? (
                    <>
                      <label>
                        Huoneen pohjan pinta-ala (m²)
                        <input type="number" min="0" step="0.1" value={estQty} onChange={e => setEstQty(e.target.value)} placeholder="Esim. 12" />
                      </label>
                      <label>
                        Seinäkorkeus (m)
                        <input type="number" min="2" step="0.1" value={estRoomHeight} onChange={e => setEstRoomHeight(e.target.value)} placeholder="Esim. 2.6" />
                      </label>
                      <label style={{display:'flex',alignItems:'center',gap:8}}>
                        <input type="checkbox" checked={estIncludeFloor} onChange={e => setEstIncludeFloor(e.target.checked)} />
                        Sisällytä lattia (betonilattian maalaus/pinnoitus)
                      </label>
                    </>
                  ) : (
                    <label>
                      Määrä ({estUnit})
                      <input type="number" min="0" step="0.1" value={estQty} onChange={e => setEstQty(e.target.value)} placeholder={estUnit === 'kpl' ? 'Esim. 3' : 'Esim. 50'} />
                    </label>
                  )}
                  <div className="cb-form-actions">
                    <button type="button" className="cb-btn ghost" onClick={() => setShowEstimator(false)}>Peruuta</button>
                    <button type="submit" className="cb-btn">Laske</button>
                  </div>
                  <div className="cb-muted">Arvio on erittäin karkea. Materiaalit, suojaukset/telineet ja esikäsittelyt erikseen.</div>
                </form>
              )}
              <div className="cb-input">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Kirjoita kysymys..."
                  onKeyDown={e => { if (e.key==='Enter') onSend() }}
                />
                <button onClick={onSend} className="cb-btn">Lähetä</button>
              </div>
            </>
          )}

          {mode === 'contact' && (
            <form className="cb-form" onSubmit={onSubmitContact}>
              <label>
                Nimi
                <input value={contact.name} onChange={e => setContact(v => ({...v, name: e.target.value}))} required />
              </label>
              <label>
                Sähköposti
                <input type="email" value={contact.email} onChange={e => setContact(v => ({...v, email: e.target.value}))} required />
              </label>
              <label>
                Puhelin
                <input value={contact.phone} onChange={e => setContact(v => ({...v, phone: e.target.value}))} />
              </label>
              <label>
                Viesti
                <textarea rows={4} value={contact.message} onChange={e => setContact(v => ({...v, message: e.target.value}))} required />
              </label>
              <div className="cb-form-actions">
                <button type="button" className="cb-btn ghost" onClick={() => setMode('chat')}>Takaisin</button>
                <button type="submit" className="cb-btn">Lähetä viesti</button>
              </div>
              <div className="cb-muted">Voit myös soittaa: 0400 580 172 tai lähettää sähköpostia: {EMAIL}</div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
