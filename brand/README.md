# Branding

Everything brand-specific lives in this folder.

| File | What it controls |
| --- | --- |
| `brand.config.json` | App name, app ID, version, colours, all screen text, service cards, icon/splash settings |
| `logo.svg` | Main logo: header, Log In button, launcher icon, splash screen |
| `badge.svg` | Picture next to the logo (set `"badge": null` to hide it) |

## Change the branding

1. Edit `brand.config.json` and/or replace `logo.svg` / `badge.svg`.
   PNG/JPG/WebP also work — put the file here and set its name in `"logo"` / `"badge"`.
   Use a logo with a transparent background.
2. Build the Android app:

   ```
   npm run apk
   ```

   The APK is at `android/app/build/outputs/apk/debug/app-debug.apk`.

Only changed text/colours and want a quick browser preview? `npm run dev`.

## Config reference

- `appName` – name under the app icon.
- `appId` – unique Android package ID (e.g. `com.yourcompany.app`). Changing it installs as a **separate app** on the phone.
- `version` / `versionCode` – shown version, and an integer that must go up for each update you install over an old one.
- `icon.background` – launcher icon background colour. `icon.logoScale` – logo size on the icon (0.8 fits Android's safe zone; go lower if it gets cropped).
- `splash.background` / `splash.logoScale` – launch screen colour and logo size.
- `colors` – every colour on the screen.
- `text` – every label on the screen.
- `services` – the cards. `icon` is one of: `person`, `map`, `fingerprint`, `qr`, `chat`, `doc-check`.
