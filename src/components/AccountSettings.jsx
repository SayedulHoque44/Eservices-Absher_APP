import { useState } from 'react'
import './AccountSettings.css'
import { userPhoto as profilePhoto } from '../userData.js'
import { CloseIcon } from './Icons.jsx'

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`toggle${on ? ' on' : ''}`}
      onClick={() => onChange(!on)}
    >
      <span className="toggle-knob" />
    </button>
  )
}

function Radio({ label, lang, checked, onChange }) {
  return (
    <label className="acc-option">
      <span lang={lang}>{label}</span>
      <input type="radio" checked={checked} onChange={onChange} />
      <span className="acc-radio" aria-hidden="true" />
    </label>
  )
}

// Logged-in Settings page. Items are selectable but inert; only Log Out acts.
export default function AccountSettings({ open, text, user, prefs, onChange, onClose, onLogout }) {
  const [biometrics, setBiometrics] = useState(true)
  const [blur, setBlur] = useState(false)

  return (
    <div className={`acc${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="acc-scroll">
        <header className="acc-bar">
          <button type="button" className="acc-close" aria-label="Close" onClick={onClose}>
            <CloseIcon size={25} />
          </button>
          <h1>{text.title}</h1>
        </header>

        <p className="acc-section">{text.accountDetails}</p>
        <div className="acc-card">
          <div className="acc-user">
            <img src={profilePhoto} alt="" className="acc-user-photo" />
            <div>
              <strong>{user.name}</strong>
              <span>
                {text.idLabel} {user.id}
              </span>
            </div>
          </div>
          <button type="button" className="acc-row">
            {text.authenticator}
          </button>
        </div>

        <p className="acc-section">{text.privacySecurity}</p>
        <div className="acc-card">
          <button type="button" className="acc-row">
            {text.trustedDevices}
          </button>
          <div className="acc-toggle-row">
            <div className="acc-toggle-text">
              <strong>{text.useBiometrics}</strong>
              <p>{text.useBiometricsDesc}</p>
            </div>
            <Toggle on={biometrics} onChange={setBiometrics} />
          </div>
          <div className="acc-toggle-row">
            <div className="acc-toggle-text">
              <strong>{text.blurImages}</strong>
              <p>{text.blurImagesDesc}</p>
            </div>
            <Toggle on={blur} onChange={setBlur} />
          </div>
        </div>

        <p className="acc-section">{text.preferences}</p>
        <div className="acc-card">
          <div className="acc-group-title">{text.language}</div>
          <Radio
            label="العربية"
            lang="ar"
            checked={prefs.language === 'ar'}
            onChange={() => onChange({ ...prefs, language: 'ar' })}
          />
          <Radio
            label="English"
            checked={prefs.language === 'en'}
            onChange={() => onChange({ ...prefs, language: 'en' })}
          />
        </div>

        <div className="acc-card">
          <div className="acc-group-title">
            {text.calendar}
            <small>{text.calendarDesc}</small>
          </div>
          <Radio
            label={text.gregorian}
            checked={prefs.calendar === 'gregorian'}
            onChange={() => onChange({ ...prefs, calendar: 'gregorian' })}
          />
          <Radio
            label={text.hijri}
            checked={prefs.calendar === 'hijri'}
            onChange={() => onChange({ ...prefs, calendar: 'hijri' })}
          />
        </div>

        <div className="acc-card">
          <button type="button" className="acc-row">
            {text.deleteIdentity}
          </button>
        </div>

        <p className="acc-section">{text.support}</p>
        <div className="acc-card">
          {text.supportItems.map((item) => (
            <button type="button" key={item} className="acc-row">
              {item}
            </button>
          ))}
        </div>

        <button type="button" className="acc-logout" onClick={onLogout}>
          {text.logout}
        </button>
      </div>
    </div>
  )
}
