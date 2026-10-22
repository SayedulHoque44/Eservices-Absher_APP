import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import '@fontsource/arimo/400.css'
import '@fontsource/arimo/500.css'
import '@fontsource/arimo/700.css'
import '@fontsource/noto-sans-arabic/400.css'
import '@fontsource/noto-sans-arabic/800.css'
import './index.css'
import App from './App.jsx'

if (Capacitor.isNativePlatform()) {
  // Dark status-bar icons over the light header.
  StatusBar.setStyle({ style: Style.Light }).catch(() => {})
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
