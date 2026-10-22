import { useEffect, useRef, useState } from 'react'
import './ChatAssistant.css'
import { CloseIcon, SendIcon, ChatSparkleIcon } from './Icons.jsx'

// Simulated AI assistant: canned welcome, tappable preset Q&A, and a fallback reply.
export default function ChatAssistant({ open, t, onClose }) {
  const [messages, setMessages] = useState([{ from: 'bot', text: t.welcome }])
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, open])

  useEffect(() => () => clearTimeout(timer.current), [])

  const ask = (question, answer) => {
    setMessages((m) => [...m, { from: 'user', text: question }])
    setTyping(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: answer }])
      setTyping(false)
    }, 900)
  }

  const sendDraft = () => {
    const q = draft.trim()
    if (!q) return
    setDraft('')
    const hit = t.presets.find((p) => p.q.toLowerCase() === q.toLowerCase())
    ask(q, hit ? hit.a : t.fallback)
  }

  return (
    <div className={`chat${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <header className="chat-head">
        <button type="button" className="chat-close" aria-label="Close" onClick={onClose}>
          <CloseIcon size={24} />
        </button>
        <div className="chat-title">
          <strong>{t.title}</strong>
          <span>{t.subtitle}</span>
        </div>
      </header>

      <div className="chat-scroll" ref={scrollRef}>
        {messages.map((m, i) =>
          m.from === 'bot' ? (
            <div className="chat-bot" key={i}>
              <span className="chat-avatar">
                <ChatSparkleIcon size={18} />
              </span>
              <div className="chat-bot-body">
                <strong className="chat-bot-name">{t.title}</strong>
                <div className="chat-bubble chat-bubble-bot">{m.text}</div>
              </div>
            </div>
          ) : (
            <div className="chat-bubble chat-bubble-user" key={i}>
              {m.text}
            </div>
          ),
        )}

        {typing && (
          <div className="chat-bot">
            <span className="chat-avatar">
              <ChatSparkleIcon size={18} />
            </span>
            <div className="chat-bubble chat-bubble-bot chat-typing">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}
      </div>

      <div className="chat-presets">
        {t.presets.map((p) => (
          <button type="button" key={p.q} className="chat-chip" onClick={() => ask(p.q, p.a)}>
            {p.q}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={draft}
          placeholder={t.inputPlaceholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendDraft()}
        />
        <button type="button" className="chat-send" aria-label="Send" onClick={sendDraft}>
          <SendIcon size={20} />
        </button>
      </div>
    </div>
  )
}
