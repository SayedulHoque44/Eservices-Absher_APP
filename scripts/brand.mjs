// Applies brand/brand.config.json to the native side:
// capacitor.config.json, launcher icon, splash screen, Android app name / ID / version.
// Usage: npm run brand
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

process.chdir(fileURLToPath(new URL('..', import.meta.url)))

// Strip a BOM in case the file was saved by Notepad.
const brand = JSON.parse(readFileSync('brand/brand.config.json', 'utf8').replace(/^﻿/, ''))
const logoFile = `brand/${brand.logo}`
const transparent = { r: 0, g: 0, b: 0, alpha: 0 }

// 1. Capacitor config
writeFileSync(
  'capacitor.config.json',
  JSON.stringify(
    {
      appId: brand.appId,
      appName: brand.appName,
      webDir: 'dist',
      backgroundColor: brand.colors.headerBg,
    },
    null,
    2,
  ) + '\n',
)
console.log('✓ capacitor.config.json')

// 2. Source images for @capacitor/assets
async function logoOnSquare(size, scale, background, out) {
  const box = Math.round(size * scale)
  const logo = await sharp(logoFile, { density: 1200 })
    .resize(box, box, { fit: 'contain', background: transparent })
    .png()
    .toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(out)
}

mkdirSync('assets', { recursive: true })
await logoOnSquare(1024, brand.icon.logoScale, transparent, 'assets/icon-foreground.png')
await sharp({ create: { width: 1024, height: 1024, channels: 4, background: brand.icon.background } })
  .png()
  .toFile('assets/icon-background.png')
await logoOnSquare(1024, Math.min(brand.icon.logoScale * 1.25, 0.9), brand.icon.background, 'assets/icon-only.png')
await logoOnSquare(2732, brand.splash.logoScale, brand.splash.background, 'assets/splash.png')
await logoOnSquare(2732, brand.splash.logoScale, brand.splash.background, 'assets/splash-dark.png')
console.log('✓ assets/ source images')

if (!existsSync('android')) {
  console.log('No android/ folder yet — run "npx cap add android", then "npm run brand" again.')
  process.exit(0)
}

// 3. Launcher icons + splash into android/
execSync('npx capacitor-assets generate --android --assetPath assets', { stdio: 'inherit' })

// 4. Android app name, ID and version
const strings = 'android/app/src/main/res/values/strings.xml'
const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, "\\'")
let xml = readFileSync(strings, 'utf8')
const setString = (name, value) => {
  xml = xml.replace(new RegExp(`(<string name="${name}">)[^<]*(</string>)`), `$1${xmlEscape(value)}$2`)
}
setString('app_name', brand.appName)
setString('title_activity_main', brand.appName)
setString('package_name', brand.appId)
setString('custom_url_scheme', brand.appId)
writeFileSync(strings, xml)

const gradleFile = 'android/app/build.gradle'
const gradle = readFileSync(gradleFile, 'utf8')
  .replace(/applicationId "[^"]*"/, `applicationId "${brand.appId}"`)
  .replace(/versionCode \d+/, `versionCode ${brand.versionCode}`)
  .replace(/versionName "[^"]*"/, `versionName "${brand.version}"`)
writeFileSync(gradleFile, gradle)
console.log(`✓ Android: "${brand.appName}" ${brand.appId} v${brand.version} (${brand.versionCode})`)
