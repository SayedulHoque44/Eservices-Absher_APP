import './ConfirmDialog.css'

export default function ConfirmDialog({ open, title, message, cancelText, confirmText, onCancel, onConfirm }) {
  return (
    <div className={`confirm${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="confirm-backdrop" onClick={onCancel} />
      <div className="confirm-box" role="dialog" aria-modal="true">
        <strong className="confirm-title">{title}</strong>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button type="button" className="confirm-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="confirm-ok" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
