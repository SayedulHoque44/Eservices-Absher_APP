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
  const [loggedIn, setLoggedIn] = useState(false)
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

  const logout = () => {
    setLogoutConfirm(false)
    setAccountOpen(false)
    setStack([])
    setTab('home')
    setLoggedIn(false)
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
        onSubmit={() => setOtpOpen(true)}
      />

      <OtpPage
        open={otpOpen}
        t={text.otp}
        onBack={() => setOtpOpen(false)}
        onSuccess={() => {
          setOtpOpen(false)
          setLoginOpen(false)
          setLoggedIn(true)
        }}
      />

      <NafathPage open={nafathOpen} t={text.nafathPage} onClose={() => setNafathOpen(false)} />

      {loggedIn && (
        <NavContext.Provider value={{ onSelect: selectTab }}>
          {tab === 'home' && (
            <HomeLoggedIn
              text={text.home}
              user={brand.user}
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
            navLabels={text.home.nav}
            onBack={back}
            onPreviewCard={() => setPreviewOpen(true)}
          />
          <ProfilePage
            {...pageProps('profile')}
            labels={text.profile}
            user={brand.user}
            navLabels={text.home.nav}
            onBack={back}
            go={go}
          />
          <PersonalDetailsPage
            {...pageProps('personal')}
            labels={text.profile}
            data={brand.user.personal}
            navLabels={text.home.nav}
            onBack={back}
          />
          <PassportPage
            {...pageProps('passport')}
            labels={text.profile}
            data={brand.user.passport}
            navLabels={text.home.nav}
            onBack={back}
          />
          <ResidentIdPage
            {...pageProps('residentId')}
            labels={text.profile}
            data={brand.user.residentId}
            navLabels={text.home.nav}
            onBack={back}
          />
          <EmptyPage
            {...pageProps('visa')}
            data={brand.user.visa}
            navLabels={text.home.nav}
            onBack={back}
          />
          <EmptyPage
            {...pageProps('drivingLicense')}
            data={brand.user.drivingLicense}
            navLabels={text.home.nav}
            onBack={back}
          />
          <EmptyPage
            {...pageProps('labor')}
            data={brand.user.labor}
            navLabels={text.home.nav}
            onBack={back}
          />
          <EmptyPage
            {...pageProps('travel')}
            data={brand.user.travel}
            navLabels={text.home.nav}
            onBack={back}
          />
          <AccountSettings
            open={accountOpen}
            text={text.accountSettings}
            user={brand.user}
            prefs={prefs}
            onChange={setPrefs}
            onClose={() => setAccountOpen(false)}
            onLogout={() => setLogoutConfirm(true)}
          />
          <CardPreview open={previewOpen} onClose={() => setPreviewOpen(false)} />

          <ChatAssistant
            open={assistantOpen}
            t={text.assistant}
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
