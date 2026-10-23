import { useState } from 'react'
import './LoginPage.css'
import { ArrowLeftIcon } from './Icons.jsx'
import { login } from '../api.js'

// Login screen. Submits the ID + PIN to the server; on success it hands the
// returned user up via onSuccess (which then opens OTP verification). Server
// error messages (wrong ID/PIN, etc.) are shown inline.
export default function LoginPage({ open, text, logo, badge, onBack, onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keep, setKeep] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = username.trim() !== '' && password.trim() !== '' && !loading

  const submit = async () => {
    if (!canSubmit) return
    setError('')
    setLoading(true)
    try {
      const user = await login(username.trim(), password.trim())
      onSuccess(user)
    } catch (e) {
      setError(e.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
            inputMode="numeric"
            autoComplete="off"
            placeholder={text.usernamePlaceholder}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setError('')
            }}
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
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <label className="login-check">
          <input type="checkbox" checked={keep} onChange={(e) => setKeep(e.target.checked)} />
          <span className="login-check-box" aria-hidden="true" />
          <span className="login-check-text">{text.keepLoggedIn}</span>
        </label>
      </div>

      <div className="login-actions">
        <button type="button" className="login-submit" disabled={!canSubmit} onClick={submit}>
          {loading ? text.loggingIn ?? 'Logging in…' : text.loginButton}
        </button>
        <button type="button" className="login-forgot">
          {text.forgotPassword}
        </button>
      </div>
    </div>
  )
}
