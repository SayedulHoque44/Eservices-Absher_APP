import './CardPreview.css'
import documentCard from '../assets/document-card.png'

// Tap the document card anywhere to open it enlarged; tap the backdrop to close.
export default function CardPreview({ open, onClose }) {
  return (
    <div
      className={`preview${open ? ' is-open' : ''}`}
      aria-hidden={!open}
      inert={!open}
      onClick={onClose}
    >
      <div className="preview-card id-card">
        <img src={documentCard} alt="" />
      </div>
    </div>
  )
}
