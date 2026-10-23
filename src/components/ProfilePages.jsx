import './ProfilePage.css'
import travelBanner from '../assets/travel-banner.png'
import SubPage, { DetailCard, DetailRow, EmptyState } from './SubPage.jsx'
import CopyToast, { useCopyToast, copyText } from './CopyToast.jsx'
import {
  CopyIcon,
  PassportIcon,
  IdCardIcon,
  VisaDocIcon,
  LaborIcon,
  LocationPinIcon,
  DocLinesIcon,
  PersonIcon,
  CrescentIcon,
  HajjIcon,
  FLAGS,
} from './Icons.jsx'

const SECTION_ICONS = { person: PersonIcon, crescent: CrescentIcon, hajj: HajjIcon }

// The API sends personal sections without icons, so fall back by section title.
const TITLE_ICONS = {
  'Personal Details': 'photo',
  'Sponsor Details': 'person',
  'Health Insurance': 'crescent',
}

// Static section appended after the user's personal details (not from the API).
const HAJJ_SECTION = {
  title: 'Hajj Details',
  icon: 'hajj',
  rows: [
    { label: 'Hajj Status', value: 'Eligible for Hajj', badge: true },
    { label: 'Last Hajj Year', value: '-' },
  ],
}

/* ---------------- My Profile ---------------- */
export function ProfilePage({ open, zIndex, labels, user, photo, navLabels, onBack, go }) {
  const toast = useCopyToast()
  return (
    <SubPage
      open={open}
      zIndex={zIndex}
      title={labels.title}
      center
      onBack={onBack}
      navLabels={navLabels}
    >
      <div className="profile-body">
        <img src={photo} alt="" className="profile-photo" />
        <div className="profile-card">
          <strong className="profile-name">{user.name}</strong>
          <button type="button" className="profile-id" onClick={() => toast.show(user.id)}>
            ID No. {user.id}
            <CopyIcon size={16} />
          </button>
          <button type="button" className="profile-personal" onClick={() => go('personal')}>
            {labels.personalDetails} ›
          </button>
        </div>

        <div className="profile-tiles">
          <button type="button" className="profile-tile" onClick={() => go('passport')}>
            <PassportIcon size={34} />
            <span>{labels.passport}</span>
          </button>
          <button type="button" className="profile-tile" onClick={() => go('residentId')}>
            <IdCardIcon size={34} />
            <span>{labels.residentId}</span>
          </button>
        </div>

        <div className="profile-list">
          <button type="button" className="profile-row" onClick={() => go('visa')}>
            <VisaDocIcon size={30} />
            <span>{labels.visa}</span>
          </button>
          <div className="profile-divider" />
          <button type="button" className="profile-row" onClick={() => go('drivingLicense')}>
            <IdCardIcon size={30} />
            <span>{labels.drivingLicense}</span>
          </button>
        </div>

        <button type="button" className="travel-banner" onClick={() => go('travel')}>
          <img src={travelBanner} alt="" />
        </button>

        <div className="profile-list">
          <button type="button" className="profile-row" onClick={() => go('labor')}>
            <LaborIcon size={30} />
            <span>{labels.labor}</span>
          </button>
        </div>
      </div>
      <CopyToast visible={toast.visible} />
    </SubPage>
  )
}

/* ---------------- My Personal Details (collapsible shell) ---------------- */
export function PersonalDetailsPage({ open, zIndex, labels, data, photo, navLabels, onBack }) {
  const toast = useCopyToast()
  return (
    <SubPage open={open} zIndex={zIndex} title={labels.personalDetails} onBack={onBack} navLabels={navLabels}>
      {[...(data.sections ?? []), HAJJ_SECTION].map((section, i) => {
        const iconKey = section.icon ?? TITLE_ICONS[section.title]
        return (
        <DetailCard
          key={section.title}
          title={section.title}
          collapsible
          defaultOpen={i === 0}
          icon={SECTION_ICONS[iconKey]}
          iconNode={
            iconKey === 'photo' ? (
              <img src={photo} alt="" className="detail-card-photo" />
            ) : undefined
          }
        >
          {section.rows
            .filter((r) => r.label !== 'Nationality')
            .map((r) => (
              <DetailRow key={r.label} {...r} onCopy={() => toast.show(r.value)} />
            ))}
        </DetailCard>
        )
      })}
      <CopyToast visible={toast.visible} />
    </SubPage>
  )
}

/* ---------------- My Passport ---------------- */
export function PassportPage({ open, zIndex, labels, data, navLabels, onBack }) {
  const toast = useCopyToast()
  return (
    <SubPage open={open} zIndex={zIndex} title={labels.passport} onBack={onBack} navLabels={navLabels}>
      <div className="mini-card">
        <strong>{data.amountDepositLabel}</strong>
        <span>{data.amountDeposit}</span>
      </div>
      <DetailCard icon={PassportIcon} title={data.sectionTitle} collapsible>
        {data.rows.map((r) => (
          <DetailRow key={r.label} {...r} onCopy={() => toast.show(r.value)} />
        ))}
      </DetailCard>
      <CopyToast visible={toast.visible} />
    </SubPage>
  )
}

/* ---------------- My Resident ID ---------------- */
export function ResidentIdPage({ open, zIndex, labels, data, navLabels, onBack }) {
  const toast = useCopyToast()
  return (
    <SubPage open={open} zIndex={zIndex} title={labels.residentId} onBack={onBack} navLabels={navLabels}>
      <DetailCard icon={IdCardIcon} title={data.cardTitle}>
        {data.rows.map((r) => (
          <DetailRow key={r.label} {...r} onCopy={() => toast.show(r.value)} />
        ))}
      </DetailCard>
      <CopyToast visible={toast.visible} />
    </SubPage>
  )
}

/* ---------------- Empty-state pages (Visa / Driving License / Labor) ---------------- */
export function EmptyPage({ open, zIndex, data, navLabels, onBack }) {
  return (
    <SubPage open={open} zIndex={zIndex} onBack={onBack} navLabels={navLabels}>
      <EmptyState icon={DocLinesIcon} title={data.emptyTitle} body={data.emptyBody} />
    </SubPage>
  )
}

/* ---------------- My Travel Records ---------------- */
export function TravelRecordsPage({ open, zIndex, data, navLabels, onBack }) {
  return (
    <SubPage open={open} zIndex={zIndex} onBack={onBack} navLabels={navLabels}>
      <DetailCard icon={LocationPinIcon} title={data.cardTitle}>
        <DetailRow label={data.statusLabel} value={data.status} />
        <DetailRow label={data.lastDestLabel} value={data.lastDest} lang="ar" />
        <DetailRow label={data.lastDateLabel} value={data.lastDate} />
      </DetailCard>

      <div className="records-card">
        <p className="records-head">{data.allRecordsLabel}</p>
        {data.records.map((rec, i) => {
          const Flag = FLAGS[rec.flag]
          return (
            <div className="record-row" key={i}>
              {Flag && <Flag size={22} />}
              <div className="record-text">
                <strong lang="ar">{rec.country}</strong>
                <span>{rec.date}</span>
              </div>
            </div>
          )
        })}
      </div>
    </SubPage>
  )
}
