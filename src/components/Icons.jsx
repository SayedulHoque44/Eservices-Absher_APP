import weaponImgUrl from '../assets/weapon-icon.png'
import passportImgUrl from '../assets/passport.png'

// Faint outlined logo strokes used as the header background pattern.
export function LogoPattern({ className }) {
  return (
    <svg viewBox="0 0 160 140" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      {[6, 26, 46, 66, 86, 106, 126].map((x, i) => (
        <rect key={x} x={x} y={i % 2 ? -20 : -40} width="14" height={i % 3 === 0 ? 170 : 150} rx="7" />
      ))}
      {[22, 52, 82, 112].map((y) => (
        <line key={y} x1="0" y1={y} x2="40" y2={y} />
      ))}
    </svg>
  )
}

function Line({ children, size = 24, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export const GearIcon = (p) => (
  <Line {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </Line>
)

export const BellIcon = (p) => (
  <Line {...p}>
    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
  </Line>
)

export const PersonIcon = (p) => (
  <Line {...p}>
    <circle cx="12" cy="7.5" r="4" />
    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0v.5h-15z" />
  </Line>
)

export const MapIcon = (p) => (
  <Line {...p}>
    <path d="M9 6.5 3.6 4.3A.4.4 0 0 0 3 4.7v14.1l6 2.7 6-2.7 5.4 2.2a.4.4 0 0 0 .6-.4V6.5L15 3.8l-2 .9" />
    <path d="M9 13.5v8" />
    <path d="M15 3.8v15" />
    <path d="M12 6.2c0 2.3-2.4 4.7-3.4 5.6a.6.6 0 0 1-.8 0C6.8 10.9 4.4 8.5 4.4 6.2a3.8 3.8 0 0 1 7.6 0z" />
    <circle cx="8.2" cy="6.2" r="1.3" />
  </Line>
)

export const FingerprintIcon = (p) => (
  <Line {...p}>
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
    <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
    <path d="M2 12a10 10 0 0 1 18-6" />
    <path d="M2 16h.01" />
    <path d="M21.8 16c.2-2 .131-5.354 0-6" />
    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
    <path d="M8.65 22c.21-.66.45-1.32.57-2" />
    <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
  </Line>
)

export const QrIcon = (p) => (
  <Line {...p}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <rect x="6.5" y="6.5" width="4.5" height="4.5" rx=".6" />
    <rect x="13" y="6.5" width="4.5" height="4.5" rx=".6" />
    <rect x="6.5" y="13" width="4.5" height="4.5" rx=".6" />
    <path d="M13 13h2v2h-2zM15.5 15.5h2v2h-2z" />
  </Line>
)

export const ChatIcon = (p) => (
  <Line {...p}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" />
  </Line>
)

export const DocCheckIcon = (p) => (
  <Line {...p}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="m9 15 2 2 4-4" />
  </Line>
)

export const SendIcon = (p) => (
  <Line {...p}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4z" />
  </Line>
)

export const CloseIcon = (p) => (
  <Line {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Line>
)

export const ArrowLeftIcon = (p) => (
  <Line {...p}>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </Line>
)

export const SearchIcon = (p) => (
  <Line {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Line>
)

export const CarIcon = (p) => (
  <Line {...p}>
    <path d="M5 11l1.6-5.2A2 2 0 0 1 8.5 4.4h7a2 2 0 0 1 1.9 1.4L19 11" />
    <rect x="3" y="11" width="18" height="7" rx="2" />
    <circle cx="7.5" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
  </Line>
)

export const CarReportIcon = (p) => (
  <Line {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <path d="M6 12l.8-2.4A1.4 1.4 0 0 1 8.1 8.7h7.8a1.4 1.4 0 0 1 1.3.9l.8 2.4" />
    <path d="M5.5 12h13v3a.8.8 0 0 1-.8.8H17" />
    <circle cx="8" cy="15" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="16" cy="15" r="0.9" fill="currentColor" stroke="none" />
  </Line>
)

export const PhotoIdIcon = (p) => (
  <Line {...p}>
    <rect x="2.5" y="4.5" width="14" height="15" rx="2.2" />
    <rect x="7.5" y="7.5" width="14" height="12" rx="2.2" fill="var(--service-bg, #fff)" />
    <circle cx="14.5" cy="11.5" r="2" />
    <path d="M10.8 17.5a3.7 3.7 0 0 1 7.4 0" />
  </Line>
)

export const WeaponIcon = ({ size = 24, className }) => (
  <img src={weaponImgUrl} alt="" className={className} style={{ height: size, width: 'auto' }} />
)

export const ChatSparkleIcon = (p) => (
  <Line {...p}>
    <path d="M4 18.5V7a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 7v6a2.5 2.5 0 0 1-2.5 2.5H9l-4 4z" />
    <path d="M15.5 8.2l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z" fill="currentColor" stroke="none" />
    <path d="M9 7.5l.35 1 1 .35-1 .35L9 10.2l-.35-1-1-.35 1-.35z" fill="currentColor" stroke="none" />
  </Line>
)

export const HomeNavIcon = (p) => {
  const { size = 24, className } = p
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M11.3 3.3a1 1 0 0 1 1.4 0l8 7.6a1 1 0 0 1-.7 1.7H19v7.2a1 1 0 0 1-1 1h-3.5v-5.3h-3V20H8a1 1 0 0 1-1-1v-7.4H5a1 1 0 0 1-.7-1.7z" />
    </svg>
  )
}

export const ServicesNavIcon = (p) => (
  <Line {...p} strokeWidth="1.7">
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0z" />
  </Line>
)

export const FamilyNavIcon = (p) => (
  <Line {...p} strokeWidth="1.7">
    <circle cx="7" cy="7" r="2.4" />
    <circle cx="17" cy="7" r="2.4" />
    <circle cx="12" cy="12.5" r="1.8" />
    <path d="M3 18.5a4 4 0 0 1 8 0" />
    <path d="M13 18.5a4 4 0 0 1 8 0" />
    <path d="M9.5 20a2.6 2.6 0 0 1 5 0" />
  </Line>
)

export const WorkersNavIcon = (p) => (
  <Line {...p} strokeWidth="1.7">
    <circle cx="8.5" cy="8" r="2.6" />
    <circle cx="16" cy="9" r="2.2" />
    <path d="M3.5 19a5 5 0 0 1 10 0z" />
    <path d="M14 14.4a4.3 4.3 0 0 1 6.5 3.7V19H15" />
  </Line>
)

export const OtherNavIcon = (p) => (
  <Line {...p} strokeWidth="1.7">
    <rect x="4" y="4" width="7" height="7" rx="1.6" />
    <rect x="13" y="4" width="7" height="7" rx="1.6" />
    <rect x="4" y="13" width="7" height="7" rx="1.6" />
    <rect x="13" y="13" width="7" height="7" rx="1.6" />
  </Line>
)

export const CopyIcon = (p) => (
  <Line {...p} strokeWidth="1.6">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
  </Line>
)

export const ChevronIcon = (p) => (
  <Line {...p} strokeWidth="2">
    <path d="m6 9 6 6 6-6" />
  </Line>
)

export const PassportIcon = ({ size = 24, className }) => (
  <img src={passportImgUrl} alt="" className={className} style={{ height: size, width: 'auto' }} />
)

// Resident ID card: photo square + two lines, with a longer line beneath.
export const IdCardIcon = (p) => (
  <Line {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.4" />
    <rect x="5.3" y="8.2" width="5" height="4.8" rx="0.9" />
    <path d="M12.6 9.5h6M12.6 11.8h6" />
    <path d="M5.3 15.9h13.4" />
  </Line>
)

export const VisaDocIcon = (p) => (
  <Line {...p}>
    <path d="M14 2.5H7A2 2 0 0 0 5 4.5v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5z" />
    <path d="M14 2.5v5h5" />
    <path d="M8.5 12h7M8.5 15h7M8.5 18h4" />
  </Line>
)

export const LaborIcon = (p) => (
  <Line {...p} strokeWidth="1.7">
    <circle cx="8.5" cy="8" r="2.6" />
    <circle cx="16" cy="9" r="2.2" />
    <path d="M3.5 19a5 5 0 0 1 10 0z" />
    <path d="M14 14.4a4.3 4.3 0 0 1 6.5 3.7V19H15" />
  </Line>
)

export const NewbornIcon = (p) => (
  <Line {...p}>
    <circle cx="12" cy="6.5" r="3.2" />
    <path d="M9.4 5.4a3.4 3.4 0 0 0 5.2 0" />
    <path d="M7 20v-2.5a5 5 0 0 1 10 0V20" />
    <path d="M7 15.5h10" />
  </Line>
)

export const PackageIcon = (p) => (
  <Line {...p}>
    <path d="M12 2.6 20 7v10l-8 4.4L4 17V7z" />
    <path d="M4 7l8 4.4L20 7" />
    <path d="M12 11.4V21" />
    <path d="M8 4.8 16 9.2" />
  </Line>
)

export const AuthIcon = (p) => (
  <Line {...p}>
    <rect x="3" y="5" width="14" height="14" rx="2.4" />
    <path d="m7 12 2.2 2.2L13 10" />
    <path d="M17.5 5.5 21 9M21 5.5 17.5 9" />
  </Line>
)

export const DonateIcon = (p) => (
  <Line {...p}>
    <path d="M12 21s-6.5-4.4-6.5-9A3.5 3.5 0 0 1 12 9.2 3.5 3.5 0 0 1 18.5 12c0 4.6-6.5 9-6.5 9z" />
  </Line>
)

export const LayersIcon = (p) => (
  <Line {...p} strokeWidth="1.6">
    <path d="m12 3 8 4.5-8 4.5-8-4.5z" />
    <path d="m4 12 8 4.5 8-4.5" />
  </Line>
)

export const PencilIcon = (p) => (
  <Line {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </Line>
)

export const CrescentIcon = (p) => (
  <Line {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
  </Line>
)

export const HajjIcon = (p) => (
  <Line {...p} strokeWidth="1.6">
    <path d="M3.5 9 12 4l8.5 5" />
    <path d="M5 9v10M19 9v10M3.5 19.5h17" />
    <path d="M9.5 19v-5a2.5 2.5 0 0 1 5 0v5" />
  </Line>
)

export const LocationPinIcon = (p) => (
  <Line {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </Line>
)

export const DocLinesIcon = (p) => (
  <Line {...p} strokeWidth="1.6" stroke="#b7b7b7">
    <path d="M14 2.5H7A2 2 0 0 0 5 4.5v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5z" />
    <path d="M14 2.5v5h5" />
    <path d="M8.5 12h7M8.5 15h7M8.5 18h4" />
  </Line>
)

export function FlagBD({ size = 22 }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 30 20">
      <rect width="30" height="20" rx="2" fill="#0a6a3a" />
      <circle cx="13" cy="10" r="6" fill="#e8112d" />
    </svg>
  )
}

export function FlagAE({ size = 22 }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 30 20">
      <rect width="30" height="20" rx="2" fill="#fff" />
      <rect width="30" height="6.67" fill="#00843d" />
      <rect y="13.33" width="30" height="6.67" fill="#000" />
      <rect width="8" height="20" fill="#c8102e" />
    </svg>
  )
}

export const FLAGS = { bd: FlagBD, ae: FlagAE }

// Icon names usable in brand.config.json "services".
export const SERVICE_ICONS = {
  person: PersonIcon,
  map: MapIcon,
  fingerprint: FingerprintIcon,
  qr: QrIcon,
  chat: ChatIcon,
  'doc-check': DocCheckIcon,
}

// Icon names usable in brand.config.json "quickAccess".
export const QUICK_ICONS = {
  car: CarIcon,
  fingerprint: FingerprintIcon,
  map: MapIcon,
  'car-report': CarReportIcon,
  'photo-id': PhotoIdIcon,
  weapon: WeaponIcon,
}

// Icon names usable in the Services / Other tab lists.
export const TAB_ICONS = {
  car: CarIcon,
  weapon: WeaponIcon,
  map: MapIcon,
  newborn: NewbornIcon,
  idcard: IdCardIcon,
  fingerprint: FingerprintIcon,
  'photo-id': PhotoIdIcon,
  'car-report': CarReportIcon,
  passport: PassportIcon,
  person: PersonIcon,
  package: PackageIcon,
  auth: AuthIcon,
  donate: DonateIcon,
  visa: VisaDocIcon,
  qr: QrIcon,
  'doc-check': DocCheckIcon,
}
