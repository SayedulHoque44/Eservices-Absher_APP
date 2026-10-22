import { useState } from 'react'
import './SubPage.css'
import { ArrowLeftIcon, ChevronIcon, CopyIcon } from './Icons.jsx'
import { copyText } from './CopyToast.jsx'

// Slide-in page: back header + scrollable content. The bottom nav is a single
// persistent bar in App; `fullscreen` pages cover it, others leave room for it.
export default function SubPage({ open, zIndex, title, center, onBack, fullscreen, children }) {
  return (
    <div
      className={`subpage${open ? ' is-open' : ''}`}
      style={{ zIndex }}
      aria-hidden={!open}
      inert={!open}
    >
      <div className={`subpage-scroll${fullscreen ? ' is-fullscreen' : ''}`}>
        <header className={`subpage-header${center ? ' is-center' : ''}`}>
          <button type="button" className="subpage-back" aria-label="Back" onClick={onBack}>
            <ArrowLeftIcon size={26} />
          </button>
          {title && <h1>{title}</h1>}
        </header>
        {children}
      </div>
    </div>
  )
}

export function DetailCard({ icon: Icon, iconNode, title, collapsible, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="detail-card">
      <button
        type="button"
        className="detail-card-head"
        onClick={() => collapsible && setOpen((o) => !o)}
      >
        {iconNode ?? (Icon && <Icon size={24} className="detail-card-icon" />)}
        <h2>{title}</h2>
        {collapsible && <ChevronIcon size={22} className={`detail-chevron${open ? ' up' : ''}`} />}
      </button>
      {open && <div className="detail-card-body">{children}</div>}
    </div>
  )
}

export function DetailRow({ label, value, lang, copy, badge, onCopy }) {
  return (
    <div className="detail-row">
      <div className="detail-label">{label}</div>
      {badge ? (
        <span className="detail-badge">
          <span className="detail-badge-dot" />
          {value}
        </span>
      ) : (
        <div className="detail-value" lang={lang}>
          {value}
        </div>
      )}
      {copy && (
        <button
          type="button"
          className="detail-copy"
          aria-label="Copy"
          onClick={() => { copyText(value); onCopy?.() }}
        >
          <CopyIcon size={20} />
        </button>
      )}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, body }) {
  return (
    <div className="empty-state">
      <Icon size={58} className="empty-icon" />
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  )
}
