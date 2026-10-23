import './DigitalDocuments.css'
import documentCard from '../assets/document-card.png'
import { ArrowLeftIcon } from './Icons.jsx'

// "Thursday 22 October 2026 12:39 AM"
function formatNow() {
  const d = new Date()
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
  const month = d.toLocaleDateString('en-US', { month: 'long' })
  const day = String(d.getDate()).padStart(2, '0')
  let h = d.getHours()
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  const hh = String(h).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${weekday} ${day} ${month} ${d.getFullYear()} ${hh}:${mm} ${ampm}`
}

export default function DigitalDocuments({ open, zIndex, text, card, navLabels, onBack, onPreviewCard }) {
  return (
    <div
      className={`docs${open ? ' is-open' : ''}`}
      style={{ zIndex }}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="docs-scroll">
        <header className="docs-header">
          <button type="button" className="docs-back" aria-label="Back" onClick={onBack}>
            <ArrowLeftIcon size={26} />
          </button>
          <h1>{text.title}</h1>
        </header>

        <p className="docs-updated">
          {text.lastUpdated} {open ? formatNow() : ''}
          <br />
          {text.pullToUpdate}
        </p>

        <h2 className="docs-doc-title">{text.residentId}</h2>

        <button type="button" className="docs-card id-card" onClick={onPreviewCard}>
          <img src={card || documentCard} alt="" />
        </button>
      </div>
    </div>
  )
}
