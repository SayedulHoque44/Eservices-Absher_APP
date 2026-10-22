import './TabPages.css'
import brand from '../../brand/brand.config.json'
import {
  SearchIcon,
  GearIcon,
  BellIcon,
  FamilyNavIcon,
  WorkersNavIcon,
  LayersIcon,
  PencilIcon,
  TAB_ICONS,
} from './Icons.jsx'

// The bottom nav is a single persistent bar in App; tabs just fill the space above it.
function TabShell({ children }) {
  return (
    <div className="tab">
      <div className="tab-scroll">{children}</div>
    </div>
  )
}

function SearchBar({ placeholder, onClick }) {
  return (
    <button type="button" className="tab-search" onClick={onClick}>
      <SearchIcon size={21} />
      <span>{placeholder}</span>
    </button>
  )
}

function ServiceCard({ title, icon, badge, action, onOpen }) {
  const Icon = TAB_ICONS[icon] ?? TAB_ICONS.person
  return (
    <button type="button" className="svc-card" onClick={() => action && onOpen?.(action)}>
      {badge && (
        <span className="svc-badge">
          <LayersIcon size={16} />
        </span>
      )}
      <Icon size={36} className="svc-icon" />
      <h3>{title}</h3>
    </button>
  )
}

function EmptyTab({ icon: Icon, title, body }) {
  return (
    <div className="tab-empty">
      <Icon size={60} className="tab-empty-icon" />
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  )
}

/* ---------------- Services ---------------- */
export function ServicesTab({ t, navLabels, active, onNavSelect, onSearch, onSettings, onOpenService }) {
  return (
    <TabShell active={active} navLabels={navLabels} onNavSelect={onNavSelect}>
      <header className="tab-head">
        <h1>{t.servicesTitle}</h1>
        <div className="tab-head-icons">
          <button type="button" aria-label="Settings" onClick={onSettings}>
            <GearIcon size={24} />
          </button>
          <button type="button" aria-label="Notifications">
            <BellIcon size={24} />
          </button>
        </div>
      </header>
      <SearchBar placeholder={t.searchByService} onClick={onSearch} />
      <div className="svc-grid">
        {brand.servicesList.map((s) => (
          <ServiceCard key={s.title} {...s} onOpen={onOpenService} />
        ))}
      </div>
    </TabShell>
  )
}

/* ---------------- Family ---------------- */
export function FamilyTab({ t, navLabels, active, onNavSelect, onSearch }) {
  return (
    <TabShell active={active} navLabels={navLabels} onNavSelect={onNavSelect}>
      <header className="tab-head">
        <h1>{t.familyTitle}</h1>
      </header>
      <SearchBar placeholder={t.searchByName} onClick={onSearch} />
      <EmptyTab icon={FamilyNavIcon} title={t.noFamilyTitle} body={t.noFamilyBody} />
    </TabShell>
  )
}

/* ---------------- Workers ---------------- */
export function WorkersTab({ t, navLabels, active, onNavSelect, onSearch }) {
  return (
    <TabShell active={active} navLabels={navLabels} onNavSelect={onNavSelect}>
      <header className="tab-head">
        <h1>{t.workersTitle}</h1>
      </header>
      <SearchBar placeholder={t.searchByName} onClick={onSearch} />
      <EmptyTab icon={WorkersNavIcon} title={t.noWorkersTitle} body={t.noWorkersBody} />
    </TabShell>
  )
}

/* ---------------- Other ---------------- */
export function OtherTab({ t, navLabels, active, onNavSelect, onSearch, onOpenService }) {
  return (
    <TabShell active={active} navLabels={navLabels} onNavSelect={onNavSelect}>
      <header className="tab-head">
        <h1>{t.otherTitle}</h1>
      </header>
      <SearchBar placeholder={t.searchByServiceShort} onClick={onSearch} />

      <div className="other-preferred">
        <h2>{t.preferredServices}</h2>
        <div className="svc-grid">
          {brand.otherPreferred.map((s) => (
            <ServiceCard key={s.title} {...s} onOpen={onOpenService} />
          ))}
        </div>
      </div>

      <div className="svc-grid svc-grid-pad">
        {brand.otherServices.map((s) => (
          <ServiceCard key={s.title} {...s} onOpen={onOpenService} />
        ))}
      </div>

      <button type="button" className="personalise">
        <PencilIcon size={18} />
        {t.personaliseSpace}
      </button>
    </TabShell>
  )
}
