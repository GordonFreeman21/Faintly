# Deploying Faintly

## Prerequisites

- **Node.js** v18+ — [nodejs.org](https://nodejs.org)
- **Rust** stable — [rustup.rs](https://rustup.rs) (`rustup update`)
- **Cargo** (comes with Rust)
- **Windows:** WebView2 runtime (preinstalled on Win10+)
- **macOS:** Xcode Command Line Tools (`xcode-select --install`)
- **Linux:** `sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev`

## Build for Production

```bash
cd faintly
npm install
npm run tauri build
```

The compiled binary lands in:

| Platform | Path |
|----------|------|
| Windows  | `src-tauri/target/release/Faintly.exe` |
| macOS    | `src-tauri/target/release/Faintly.dmg` |
| Linux    | `src-tauri/target/release/Faintly.deb` |

## Distribute

### Option A — GitHub Releases (easiest)

1. Push to GitHub (already done).
2. Go to your repo → **Releases** → **Create a new release**.
3. Tag it (e.g. `v1.0.0`), write notes, then attach the `.exe` / `.dmg` / `.deb` from the build step above.
4. Users download and run.

### Option B — Manual / Sideload

- Windows: give people the `.exe` (no install needed, it's a single portable binary).
- macOS: they'll need to right-click → Open (Gatekeeper bypass) unless you notarize.
- Linux: `sudo dpkg -i Faintly.deb`

## Auto-Update (optional)

If you want built-in auto-updates later, add `tauri-plugin-updater` to `Cargo.toml` and configure a server endpoint in `tauri.conf.json`. See [Tauri updater docs](https://v2.tauri.app/plugin/updater/).

## Notes

- The `tauri.conf.json` identifier is `com.faintly.app` — change it if you're publishing to an app store.
- Icons live in `src-tauri/icons/`. Replace them with your own before release.
