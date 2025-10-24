import { useEffect, useMemo, useRef, useState } from 'react'
import { findBestAnswer } from '../data/faqs'

const PHONE = '+358400580172'
const EMAIL = 'teuvo.jarvenpaa@luukku.com'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('chat') // chat | contact
  const [messages, setMessages] = useState(() => ([
    { role: 'bot', text: 'Hei! Olen Teuvo Järvenpää Oy:n avustaja. Vastaan yleisiin kysymyksiin ja voin myös välittää viestisi yritykselle.' },
    { role: 'bot', text: 'Kokeile: "Teettekö peltikattojen maalauksia?" tai avaa yhteydenotto lomake.' }
  ]))
  const [input, setInput] = useState('')
  const listRef = useRef(null)

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

  const quickActions = (
    <div className="cb-quick">
      <button className="cb-btn ghost" onClick={() => setMode('contact')}>Ota yhteyttä</button>
      <a className="cb-btn ghost" href={`https://wa.me/${PHONE.replace(/[^0-9]/g,'')}?text=${encodeURIComponent('Hei! Tarvitsen lisätietoja / tarjouksen.')}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="cb-btn ghost" href={`sms:${PHONE}?body=${encodeURIComponent('Hei! Tarvitsen lisätietoja / tarjouksen.')}`}>SMS</a>
    </div>
  )

  return (
    <div className={`cb-root ${open ? 'open' : ''}`}>
      {!open && (
        <button className="cb-fab" aria-label="Avaa chat" onClick={() => setOpen(true)}>
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
                  <div key={i} className={`cb-msg ${m.role}`}>{m.text}</div>
                ))}
              </div>
              {quickActions}
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
