import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const brand = JSON.parse(
  readFileSync(new URL('./brand/brand.config.json', import.meta.url), 'utf8').replace(/^﻿/, ''),
)
const kebab = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())

// Puts the app name, theme colour and brand colour variables into index.html.
function brandHtml() {
  return {
    name: 'brand-html',
    transformIndexHtml(html) {
      const vars = Object.entries(brand.colors)
        .map(([key, value]) => `--${kebab(key)}: ${value};`)
        .join(' ')
      return html
        .replaceAll('%APP_NAME%', brand.appName)
        .replaceAll('%THEME_COLOR%', brand.colors.headerBg)
        .replace('</head>', `  <style>:root { ${vars} }</style>\n  </head>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), brandHtml()],
})
