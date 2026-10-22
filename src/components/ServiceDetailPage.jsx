import { useState } from 'react'
import './ServiceDetailPage.css'
import { ArrowLeftIcon, CloseIcon, TAB_ICONS } from './Icons.jsx'

// Generic service page: header, optional Received/Sent tabs, empty state, optional action button.
export default function ServiceDetailPage({ open, zIndex, data, onBack }) {
  const [tab, setTab] = useState(0)
  const Icon = TAB_ICONS[data.icon] ?? TAB_ICONS.person
  const HeaderIcon = data.close ? CloseIcon : ArrowLeftIcon

  return (
    <div
      className={`svcpage${open ? ' is-open' : ''}`}
      style={{ zIndex }}
      aria-hidden={!open}
      inert={!open}
    >
      <header className="svcpage-head">
        <button type="button" className="svcpage-back" aria-label="Back" onClick={onBack}>
          <HeaderIcon size={25} />
        </button>
        <h1>{data.title}</h1>
      </header>

      {data.tabs && (
        <div className="svcpage-tabs">
          {data.tabs.map((label, i) => (
            <button
              type="button"
              key={label}
              className={`svcpage-tab${tab === i ? ' is-active' : ''}`}
              onClick={() => setTab(i)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="svcpage-body">
        <Icon size={56} className="svcpage-empty-icon" />
        <strong>{data.emptyTitle}</strong>
        <p>{data.emptyBody}</p>
      </div>

      {data.button && (
        <div className="svcpage-footer">
          <button type="button" className="svcpage-btn">
            {data.button}
          </button>
        </div>
      )}
    </div>
  )
}
