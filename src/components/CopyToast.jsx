import { useEffect, useState, useCallback } from 'react'
import './CopyToast.css'

export function copyText(value) {
  try {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => {})
      return
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = value
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  } catch {
    /* ignore */
  }
}

// Tiny "Copied" toast that auto-fades. Call show() to trigger.
export function useCopyToast() {
  const [visible, setVisible] = useState(false)
  const show = useCallback((value) => {
    copyText(value)
    setVisible(true)
  }, [])
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 1400)
    return () => clearTimeout(t)
  }, [visible])
  return { visible, show }
}

export default function CopyToast({ visible }) {
  return (
    <div className={`copy-toast${visible ? ' is-show' : ''}`}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
      Copied
    </div>
  )
}
