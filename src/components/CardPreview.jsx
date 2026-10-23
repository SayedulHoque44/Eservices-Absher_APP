import { useEffect, useRef, useState } from 'react'
import './CardPreview.css'
import documentCard from '../assets/document-card.png'
import absherLogo from '../../brand/logo.png'
import { CloseIcon } from './Icons.jsx'

const QR_SIZE = 41
const PERIOD = 30 // seconds between QR regenerations

// Build a random QR-like matrix: three finder patterns in the corners and
// random data modules elsewhere. Not a real (scannable) QR — just for display.
function makeMatrix() {
  const m = Array.from({ length: QR_SIZE }, () => Array(QR_SIZE).fill(false))
  const placeFinder = (r, c) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const edge = i === 0 || i === 6 || j === 0 || j === 6
        const core = i >= 2 && i <= 4 && j >= 2 && j <= 4
        m[r + i][c + j] = edge || core
      }
    }
  }
  placeFinder(0, 0)
  placeFinder(0, QR_SIZE - 7)
  placeFinder(QR_SIZE - 7, 0)
  for (let r = 0; r < QR_SIZE; r++) {
    for (let c = 0; c < QR_SIZE; c++) {
      const inFinder =
        (r < 8 && c < 8) ||
        (r < 8 && c >= QR_SIZE - 8) ||
        (r >= QR_SIZE - 8 && c < 8)
      if (!inFinder) m[r][c] = Math.random() > 0.52
    }
  }
  return m
}

function QrCard({ running }) {
  const [matrix, setMatrix] = useState(makeMatrix)
  const [sec, setSec] = useState(PERIOD)

  useEffect(() => {
    if (!running) return
    setSec(PERIOD)
    setMatrix(makeMatrix())
    const id = setInterval(() => {
      setSec((s) => {
        if (s <= 1) {
          setMatrix(makeMatrix())
          return PERIOD
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  const label = `00:${String(sec).padStart(2, '0')}`

  return (
    <div className="qr-card">
      <div className="qr-leftcol">
        <span className="qr-sidetext">QR code updates every 30 seconds</span>
        <span className="qr-timer">{label}</span>
      </div>
      <div className="qr-box">
        <svg className="qr-svg" viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} shapeRendering="crispEdges">
          <rect x="0" y="0" width={QR_SIZE} height={QR_SIZE} fill="#fff" />
          {matrix.map((row, r) =>
            row.map((on, c) =>
              on ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#111" /> : null,
            ),
          )}
        </svg>
        <span className="qr-logo">
          <img src={absherLogo} alt="" />
        </span>
      </div>
    </div>
  )
}

// Swipeable preview: the digital document card, and swipe up for the QR card.
export default function CardPreview({ open, card, onClose }) {
  const [slide, setSlide] = useState(0)
  const startY = useRef(null)

  useEffect(() => {
    if (!open) setSlide(0)
  }, [open])

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    if (startY.current == null) return
    const dy = e.changedTouches[0].clientY - startY.current
    if (dy < -45 && slide === 0) setSlide(1)
    else if (dy > 45 && slide === 1) setSlide(0)
    startY.current = null
  }

  return (
    <div className={`preview${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <button type="button" className="preview-close" aria-label="Close" onClick={onClose}>
        <CloseIcon size={26} />
      </button>

      <div
        className="preview-track"
        style={{ transform: `translateY(-${slide * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="preview-slide">
          <div className="doc-card id-card">
            <img src={card || documentCard} alt="" className="doc-img" />
          </div>
        </div>
        <div className="preview-slide">
          <QrCard running={open && slide === 1} />
        </div>
      </div>
    </div>
  )
}
