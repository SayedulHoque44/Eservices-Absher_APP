import './HomeLoggedIn.css'
import brand from '../../brand/brand.config.json'
import documentCard from '../assets/document-card.png'
import { SearchIcon, GearIcon, BellIcon, ChatIcon, ChatSparkleIcon, QUICK_ICONS } from './Icons.jsx'

const brandFiles = import.meta.glob('../../brand/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const logo = brandFiles[`../../brand/${brand.logo}`]
const badge = brandFiles[`../../brand/${brand.badge}`]

// Logged-in dashboard. Everything is tappable but performs no real action.
export default function HomeLoggedIn({
  text,
  user,
  photo,
  card,
  quickAccess,
  onSettings,
  onProfile,
  onSearch,
  onSeeAllDocuments,
  onPreviewCard,
  onOpenService,
  onAssistant,
}) {
  return (
    <div className="home">
      <div className="home-scroll">
        <header className="home-header">
          <div className="home-brand">
            <img src={logo} alt={brand.appName} className="home-logo" />
            {badge && <img src={badge} alt="" className="home-badge" />}
          </div>
          <div className="home-icons">
            <button type="button" aria-label="Search" onClick={onSearch}>
              <SearchIcon size={23} />
            </button>
            <button type="button" aria-label="Settings" onClick={onSettings}>
              <GearIcon size={23} />
            </button>
            <button type="button" aria-label="Notifications">
              <BellIcon size={23} />
            </button>
          </div>
        </header>

        <div className="home-body">
          <button type="button" className="user-card" onClick={onProfile}>
            <img src={photo} alt="" className="user-photo" />
            <div className="user-info">
              <strong>{user.name}</strong>
              <span>
                {text.idLabel} {user.id}
              </span>
            </div>
          </button>

          <button type="button" className="service-search" onClick={onSearch}>
            <SearchIcon size={21} />
            <span>{text.searchPlaceholder}</span>
          </button>

          <div className="survey-card">
            <span className="survey-icon">
              <ChatIcon size={22} />
            </span>
            <div className="survey-text">
              <strong>{text.surveyTitle}</strong>
              <p>{text.surveyBody}</p>
              <button type="button" className="survey-action">
                {text.surveyAction}
              </button>
            </div>
          </div>

          <section className="home-section">
            <div className="home-section-head">
              <h2>{text.documentsTitle}</h2>
              <button type="button" className="see-all-link" onClick={onSeeAllDocuments}>
                {text.seeAll}
              </button>
            </div>
            <button type="button" className="document-card id-card" onClick={onPreviewCard}>
              <img src={card || documentCard} alt="" />
            </button>
          </section>

          <section className="quick-access">
            <h2>{text.quickAccessTitle}</h2>
            <div className="qa-grid">
              {quickAccess.map(({ title, desc, icon, wide, action }) => {
                const Icon = QUICK_ICONS[icon] ?? QUICK_ICONS.car
                return (
                  <button
                    type="button"
                    key={title}
                    className={`qa-card${wide ? ' qa-wide' : ''}`}
                    onClick={() => action && onOpenService(action)}
                  >
                    <Icon size={38} className="qa-icon" />
                    <div className="qa-text">
                      <strong>{title}</strong>
                      {desc && <p>{desc}</p>}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </div>

      <button type="button" className="home-fab" aria-label="Assistant" onClick={onAssistant}>
        <ChatSparkleIcon size={26} />
      </button>
    </div>
  )
}
