import './NafathPage.css'
import { CloseIcon } from './Icons.jsx'

function AppleBadge() {
  return (
    <span className="nf-store">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
        <path d="M16.3 12.7c0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2.1 2.4 2 1-.04 1.3-.6 2.5-.6s1.5.6 2.6.6 1.7-1 2.3-2a9 9 0 0 0 1-2.2c-.03-.01-2-.8-2-3.2zM14.5 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-1 1.5-.8 2.4.9.07 1.8-.4 2.3-1.1z" />
      </svg>
      <span className="nf-store-text">
        <small>Download on the</small>
        <b>App Store</b>
      </span>
    </span>
  )
}

function PlayBadge() {
  return (
    <span className="nf-store">
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path d="M3.6 2.3 13.5 12 3.6 21.7a1 1 0 0 1-.6-.9V3.2a1 1 0 0 1 .6-.9z" fill="#00d0ff" />
        <path d="M3.6 2.3 13.5 12l3-3-11.4-6.5a1.2 1.2 0 0 0-1.5.8z" fill="#00f076" />
        <path d="M3.6 21.7 13.5 12l3 3-11.4 6.5a1.2 1.2 0 0 1-1.5-.8z" fill="#ff3a44" />
        <path d="M16.5 9 20 11a1.1 1.1 0 0 1 0 2l-3.5 2-3-3z" fill="#ffc900" />
      </svg>
      <span className="nf-store-text">
        <small>GET IT ON</small>
        <b>Google Play</b>
      </span>
    </span>
  )
}

function GalleryBadge() {
  return (
    <span className="nf-store">
      <svg viewBox="0 0 24 24" width="19" height="19">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#e4473c" />
        <path
          d="M8 7v6a4 4 0 0 0 8 0V7"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="nf-store-text">
        <small>Available on the</small>
        <b>AppGallery</b>
      </span>
    </span>
  )
}

export default function NafathPage({ open, t, onClose }) {
  return (
    <div className={`nafath-page${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="nf-scroll">
        <div className="nf-top">
          <button type="button" className="nf-close" aria-label="Close" onClick={onClose}>
            <CloseIcon size={24} />
          </button>
          <div className="nf-verify">
            <span>{t.verifyText}</span>
            <span className="nf-timer">{t.timer}</span>
          </div>
          <div className="nf-logo-row">
            <span className="nf-logo" lang="ar">
              {t.logo}
            </span>
            <span className="nf-menu" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>

        <div className="nf-welcome">
          <h1>{t.welcome}</h1>
        </div>

        <div className="nf-appbar">
          <span>{t.appBar}</span>
          <span className="nf-collapse">–</span>
        </div>

        <div className="nf-card">
          <label className="nf-label">{t.idLabel}</label>
          <input className="nf-input" type="text" placeholder={t.idPlaceholder} />
          <button type="button" className="nf-login">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
            {t.login}
          </button>

          <p className="nf-download">{t.download}</p>
          <div className="nf-stores">
            <AppleBadge />
            <PlayBadge />
            <GalleryBadge />
          </div>
        </div>
      </div>
    </div>
  )
}
