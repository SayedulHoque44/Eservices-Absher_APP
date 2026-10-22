import { useState } from 'react'
import './LoginPage.css'
import { ArrowLeftIcon } from './Icons.jsx'

// Static login screen. The inputs are local-only React state for a realistic
// mockup — nothing is stored, logged, submitted, or sent anywhere, and the
// Log In / Forgot Password buttons perform no action.
export default function LoginPage({ open, text, logo, badge, onBack, onSubmit }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keep, setKeep] = useState(false)

  // Button becomes active once both fields are filled. It still performs no
  // real login — this only enables and styles the button.
  const canSubmit = username.trim() !== '' && password.trim() !== ''

  return (
    <div className={`login${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="login-bar">
        <button type="button" className="login-back" aria-label="Back" onClick={onBack}>
          <ArrowLeftIcon size={26} />
        </button>
      </div>

      <div className="login-brand">
        <img src={logo} alt="" className="login-logo" />
        {badge && <img src={badge} alt="" className="login-badge" />}
      </div>

      <h1 className="login-title">{text.loginTitle}</h1>

      <div className="login-form">
        <div className="login-field">
          <label htmlFor="login-username">{text.usernameLabel}</label>
          <input
            id="login-username"
            type="text"
            autoComplete="off"
            placeholder={text.usernamePlaceholder}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label htmlFor="login-password">{text.passwordLabel}</label>
          <input
            id="login-password"
            type="password"
            autoComplete="off"
            placeholder={text.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <label className="login-check">
          <input type="checkbox" checked={keep} onChange={(e) => setKeep(e.target.checked)} />
          <span className="login-check-box" aria-hidden="true" />
          <span className="login-check-text">{text.keepLoggedIn}</span>
        </label>
      </div>

      <div className="login-actions">
        <button
          type="button"
          className="login-submit"
          disabled={!canSubmit}
          onClick={() => canSubmit && onSubmit()}
        >
          {text.loginButton}
        </button>
        <button type="button" className="login-forgot">
          {text.forgotPassword}
        </button>
      </div>
    </div>
  )
}
