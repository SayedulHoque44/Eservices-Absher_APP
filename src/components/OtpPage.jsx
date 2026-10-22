import { useEffect, useState } from 'react'
import './OtpPage.css'
import { CopyIcon } from './Icons.jsx'
import CopyToast, { useCopyToast } from './CopyToast.jsx'

const LEN = 4
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back']

// Verification page: shows a randomly generated OTP in a notification, and the
// user re-enters it on the keypad. Correct entry logs in.
export default function OtpPage({ open, t, onBack, onSuccess }) {
  const [code, setCode] = useState('')
  const [entry, setEntry] = useState('')
  const [error, setError] = useState(false)
  const toast = useCopyToast()

  useEffect(() => {
    if (!open) return
    setCode(String(Math.floor(1000 + Math.random() * 9000)))
    setEntry('')
    setError(false)
  }, [open])

  const press = (key) => {
    if (key === 'back') {
      setEntry((e) => e.slice(0, -1))
      setError(false)
      return
    }
    if (!key || entry.length >= LEN) return
    const next = entry + key
    setEntry(next)
    setError(false)
    if (next.length === LEN) {
      setTimeout(() => {
        if (next === code) onSuccess()
        else {
          setError(true)
          setTimeout(() => setEntry(''), 650)
        }
      }, 160)
    }
  }

  return (
    <div className={`otp${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="otp-notif">
        <div className="otp-notif-top">
          <span>{t.notifApp}</span>
          <span>{t.notifTime} ⌄</span>
        </div>
        <div className="otp-notif-body">
          <span className="otp-notif-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#2e6cfe">
              <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z" />
            </svg>
          </span>
          <div className="otp-notif-text">
            <strong>{t.notifSender}</strong>
            <span>
              {t.notifCodeLabel} {code}
            </span>
            <button type="button" className="otp-copy" onClick={() => toast.show(code)}>
              <CopyIcon size={16} />
              {code}
            </button>
          </div>
        </div>
      </div>

      <h1 className="otp-title">{t.title}</h1>
      <p className="otp-subtitle">{t.subtitle}</p>
      <p className="otp-via">
        {t.mask}
        <b>{code}</b> {t.viaSms}
      </p>

      <div className={`otp-boxes${error ? ' is-error' : ''}`}>
        {Array.from({ length: LEN }).map((_, i) => (
          <div
            key={i}
            className={`otp-box${i === entry.length ? ' is-active' : ''}${
              entry[i] ? ' is-filled' : ''
            }`}
          >
            {entry[i] ? entry[i] : i === entry.length ? <span className="otp-caret" /> : ''}
          </div>
        ))}
      </div>

      <div className="otp-keypad">
        {KEYS.map((key, i) =>
          key === '' ? (
            <span key={i} />
          ) : (
            <button type="button" key={i} className="otp-key" onClick={() => press(key)}>
              {key === 'back' ? (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 5H9L3 12l6 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z" />
                  <path d="m17 9-6 6M11 9l6 6" />
                </svg>
              ) : (
                key
              )}
            </button>
          ),
        )}
      </div>

      <div className="otp-footer">
        <button type="button" className="otp-auth-btn">
          {t.button}
        </button>
      </div>

      <CopyToast visible={toast.visible} />
    </div>
  )
}
