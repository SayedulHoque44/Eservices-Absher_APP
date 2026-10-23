import { useEffect, useRef, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { App as NativeApp } from '@capacitor/app'
import './App.css'
import brand from '../brand/brand.config.json'
import { LogoPattern, GearIcon, BellIcon, SERVICE_ICONS } from './components/Icons.jsx'
import BottomNav, { NavContext } from './components/BottomNav.jsx'
import { ServicesTab, FamilyTab, WorkersTab, OtherTab } from './components/TabPages.jsx'
import Settings from './components/Settings.jsx'
import AccountSettings from './components/AccountSettings.jsx'
import LoginPage from './components/LoginPage.jsx'
import NafathPage from './components/NafathPage.jsx'
import OtpPage from './components/OtpPage.jsx'
import HomeLoggedIn from './components/HomeLoggedIn.jsx'
import DigitalDocuments from './components/DigitalDocuments.jsx'
import CardPreview from './components/CardPreview.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import ChatAssistant from './components/ChatAssistant.jsx'
import SearchPage from './components/SearchPage.jsx'
import ServiceDetailPage from './components/ServiceDetailPage.jsx'
import {
  ProfilePage,
  PersonalDetailsPage,
  PassportPage,
  ResidentIdPage,
  EmptyPage,
} from './components/ProfilePages.jsx'
import { resolvePhoto, resolveCard } from './userData.js'

// Logged-in session kept in localStorage so the user stays signed in until they
// explicitly log out (persists across app restarts).
const SESSION_KEY = 'absar_session'
const loadSession = () => {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    if (s && s.loggedIn && s.user) return s
  } catch {
    /* ignore */
  }
  return null
}
// Empty-state sections (Visa / Driving License / Labor / Travel) the API does
// not carry — these are genuine "you have none" states, not placeholder data.
const EMPTY_SECTIONS = {
  visa: brand.user.visa,
  drivingLicense: brand.user.drivingLicense,
  labor: brand.user.labor,
  travel: brand.user.travel,
}

const brandFiles = import.meta.glob('../brand/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const brandFile = (name) => name && brandFiles[`../brand/${name}`]

const logo = brandFile(brand.logo)
const badge = brandFile(brand.badge)
const { text } = brand

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [nafathOpen, setNafathOpen] = useState(false)
  const [otpOpen, setOtpOpen] = useState(false)
  const [loginKey, setLoginKey] = useState(0)
  // Restore a saved session on first render so a returning user lands logged in.
  const saved = loadSession()
  const [loggedIn, setLoggedIn] = useState(!!saved)
  const [user, setUser] = useState(saved ? saved.user : null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [logoutConfirm, setLogoutConfirm] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  // Navigation stack of page ids over the dashboard, e.g. ['profile', 'passport'].
  const [stack, setStack] = useState([])
  const [tab, setTab] = useState('home')
  const [prefs, setPrefs] = useState({ language: 'en', calendar: 'gregorian' })

  const go = (id) => setStack((s) => [...s, id])
  const back = () => setStack((s) => s.slice(0, -1))
  // Pages that cover the persistent bottom nav sit above it (z 55+); the rest below (z 40+).
  const FULLSCREEN = new Set(['search', ...Object.keys(brand.servicePages)])
  const pageProps = (id) => ({
    open: stack.includes(id),
    zIndex: (FULLSCREEN.has(id) ? 55 : 40) + stack.indexOf(id),
  })
  const selectTab = (key) => {
    setStack([])
    setTab(key)
  }

  // Real user data from the API, with the empty-state sections filled in and
  // safe defaults so a missing section never crashes a profile page.
  const fullUser = user
    ? {
        personal: { sections: [] },
        passport: { rows: [] },
        residentId: { rows: [] },
        ...EMPTY_SECTIONS,
        ...user,
      }
    : null
  const userPhoto = resolvePhoto(user?.photo)
  const docCard = resolveCard(user?.absher_card)

  // Called after the OTP is verified: mark logged in and persist the session.
  const completeLogin = () => {
    setOtpOpen(false)
    setLoginOpen(false)
    setLoggedIn(true)
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ loggedIn: true, user }))
    } catch {
      /* ignore */
    }
  }

  const logout = () => {
    setLogoutConfirm(false)
    setAccountOpen(false)
    setStack([])
    setTab('home')
    setLoggedIn(false)
    setUser(null)
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      /* ignore */
    }
    setLoginKey((k) => k + 1)
    setLoginOpen(true)
  }

  // Android back button: close the topmost open screen, otherwise leave the app.
  const stateRef = useRef()
  stateRef.current = {
    settingsOpen,
    accountOpen,
    loginOpen,
    previewOpen,
    logoutConfirm,
    assistantOpen,
    otpOpen,
    nafathOpen,
    stackLen: stack.length,
    tab,
  }
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    const listener = NativeApp.addListener('backButton', () => {
      const s = stateRef.current
      if (s.logoutConfirm) setLogoutConfirm(false)
      else if (s.previewOpen) setPreviewOpen(false)
      else if (s.assistantOpen) setAssistantOpen(false)
      else if (s.otpOpen) setOtpOpen(false)
      else if (s.nafathOpen) setNafathOpen(false)
      else if (s.accountOpen) setAccountOpen(false)
      else if (s.settingsOpen) setSettingsOpen(false)
      else if (s.stackLen > 0) back()
      else if (s.tab !== 'home') selectTab('home')
      else if (s.loginOpen) setLoginOpen(false)
      else NativeApp.exitApp()
    })
    return () => {
      listener.then((l) => l.remove())
    }
  }, [])

  return (
    <div className="screen">
      <Settings
        open={settingsOpen}
        text={text.settings}
        prefs={prefs}
        onChange={setPrefs}
        onClose={() => setSettingsOpen(false)}
      />

      <LoginPage
        key={loginKey}
        open={loginOpen}
        text={text.loginPage}
        logo={logo}
        badge={badge}
        onBack={() => setLoginOpen(false)}
        onSuccess={(u) => {
          setUser(u)
          setOtpOpen(true)
        }}
      />

      <OtpPage
        open={otpOpen}
        t={text.otp}
        onBack={() => setOtpOpen(false)}
        onSuccess={completeLogin}
      />

      <NafathPage open={nafathOpen} t={text.nafathPage} onClose={() => setNafathOpen(false)} />

      {loggedIn && fullUser && (
        <NavContext.Provider value={{ onSelect: selectTab }}>
          {tab === 'home' && (
            <HomeLoggedIn
              text={text.home}
              user={fullUser}
              photo={userPhoto}
              card={docCard}
              quickAccess={brand.quickAccess}
              onSettings={() => setAccountOpen(true)}
              onProfile={() => go('profile')}
              onSearch={() => go('search')}
              onSeeAllDocuments={() => go('documents')}
              onPreviewCard={() => setPreviewOpen(true)}
              onOpenService={go}
              onAssistant={() => setAssistantOpen(true)}
            />
          )}
          {tab === 'services' && (
            <ServicesTab
              t={text.tabs}
              navLabels={text.home.nav}
              active="services"
              onNavSelect={selectTab}
              onSearch={() => go('search')}
              onSettings={() => setAccountOpen(true)}
              onOpenService={go}
            />
          )}
          {tab === 'family' && (
            <FamilyTab
              t={text.tabs}
              navLabels={text.home.nav}
              active="family"
              onNavSelect={selectTab}
              onSearch={() => go('search')}
            />
          )}
          {tab === 'workers' && (
            <WorkersTab
              t={text.tabs}
              navLabels={text.home.nav}
              active="workers"
              onNavSelect={selectTab}
              onSearch={() => go('search')}
            />
          )}
          {tab === 'other' && (
            <OtherTab
              t={text.tabs}
              navLabels={text.home.nav}
              active="other"
              onNavSelect={selectTab}
              onSearch={() => go('search')}
              onOpenService={go}
            />
          )}
          <SearchPage
            {...pageProps('search')}
            text={text.search}
            results={brand.searchResults}
            onBack={back}
          />
          {Object.entries(brand.servicePages).map(([key, data]) => (
            <ServiceDetailPage key={key} {...pageProps(key)} data={data} onBack={back} />
          ))}
          <DigitalDocuments
            {...pageProps('documents')}
            text={text.documents}
            card={docCard}
            navLabels={text.home.nav}
            onBack={back}
            onPreviewCard={() => setPreviewOpen(true)}
          />
          <ProfilePage
            {...pageProps('profile')}
            labels={text.profile}
            user={fullUser}
            photo={userPhoto}
            navLabels={text.home.nav}
            onBack={back}
            go={go}
          />
          <PersonalDetailsPage
            {...pageProps('personal')}
            labels={text.profile}
            data={fullUser.personal}
            photo={userPhoto}
            navLabels={text.home.nav}
            onBack={back}
          />
          <PassportPage
            {...pageProps('passport')}
            labels={text.profile}
            data={fullUser.passport}
            navLabels={text.home.nav}
            onBack={back}
          />
          <ResidentIdPage
            {...pageProps('residentId')}
            labels={text.profile}
            data={fullUser.residentId}
            navLabels={text.home.nav}
            onBack={back}
          />
          <EmptyPage
            {...pageProps('visa')}
            data={fullUser.visa}
            navLabels={text.home.nav}
            onBack={back}
          />
          <EmptyPage
            {...pageProps('drivingLicense')}
            data={fullUser.drivingLicense}
            navLabels={text.home.nav}
            onBack={back}
          />
          <EmptyPage
            {...pageProps('labor')}
            data={fullUser.labor}
            navLabels={text.home.nav}
            onBack={back}
          />
          <EmptyPage
            {...pageProps('travel')}
            data={fullUser.travel}
            navLabels={text.home.nav}
            onBack={back}
          />
          <AccountSettings
            open={accountOpen}
            text={text.accountSettings}
            user={fullUser}
            photo={userPhoto}
            prefs={prefs}
            onChange={setPrefs}
            onClose={() => setAccountOpen(false)}
            onLogout={() => setLogoutConfirm(true)}
          />
          <CardPreview open={previewOpen} card={docCard} onClose={() => setPreviewOpen(false)} />

          <ChatAssistant
            open={assistantOpen}
            t={text.assistant}
            userName={fullUser.name}
            onClose={() => setAssistantOpen(false)}
          />

          <BottomNav labels={text.home.nav} active={tab} onSelect={selectTab} />

          <ConfirmDialog
            open={logoutConfirm}
            title={text.accountSettings.logoutTitle}
            message={text.accountSettings.logoutMessage}
            cancelText={text.accountSettings.cancel}
            confirmText={text.accountSettings.logout}
            onCancel={() => setLogoutConfirm(false)}
            onConfirm={logout}
          />
        </NavContext.Provider>
      )}

      <header className="hero">
        <LogoPattern className="hero-pattern" />

        <div className="top-actions">
          <button type="button" aria-label="Settings" onClick={() => setSettingsOpen(true)}>
            <GearIcon size={25} />
          </button>
          <button type="button" aria-label="Notifications">
            <BellIcon size={25} />
          </button>
        </div>

        <div className="brand">
          <img src={logo} alt={brand.appName} className="brand-logo" />
          {badge && <img src={badge} alt="" className="brand-badge" />}
        </div>

        <h1 className="title">{text.title}</h1>

        <button type="button" className="btn btn-primary" onClick={() => setLoginOpen(true)}>
          <span className="btn-logo" style={{ '--logo': `url("${logo}")` }} />
          <span>{text.login}</span>
        </button>

        <button type="button" className="btn btn-outline" onClick={() => setNafathOpen(true)}>
          <span className="nafath" lang="ar">
            {text.nafathArabic}
          </span>
          <span className="nafath-text">{text.nafath}</span>
        </button>
      </header>

      <section className="services">
        <div className="services-head">
          <h2>{text.servicesTitle}</h2>
          <button type="button" className="see-all">
            {text.seeAll}
          </button>
        </div>

        {/* Grid fills column by column (2 rows), matching the horizontal scroller in the design. */}
        <div className="services-grid">
          {brand.services.map(({ title, icon }) => {
            const Icon = SERVICE_ICONS[icon] ?? SERVICE_ICONS.person
            return (
              <article key={title} className="card">
                <Icon size={42} className="card-icon" />
                <h3>{title}</h3>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
