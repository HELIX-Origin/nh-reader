# Development Setup

This guide details how to configure a local development environment for NH Reader across Windows, macOS, and Linux.

---

## System Prerequisites

1. **Node.js**: LTS version (v20+ recommended).
2. **Rust**: Latest stable release (via `rustup`).
3. **Platform-Specific Build Tools**:
   - **Windows**:
     - Visual Studio 2022 / Build Tools with C++ workload.
     - Microsoft Edge WebView2 runtime.
   - **macOS**:
     - Xcode Command Line Tools (`xcode-select --install`).
   - **Linux** (Debian/Ubuntu):
     ```bash
     sudo apt update
     sudo apt install -y build-essential curl wget libssl-dev libgtk-3-dev \
       libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf
     ```

---

## Clone & Install Dependencies

```bash
git clone https://github.com/HELIX-Origin/nh-reader.git
cd nh-reader

# Install Node dependencies
npm install
```

---

## Running in Development Mode

To start the local Vite development server with hot-module replacement and launch the native Tauri desktop window:

```bash
npm run tauri:dev
```

- **Vite Dev Server Port**: `http://localhost:14440`
- **HMR WebSocket Port**: `14441`
- Frontend code changes (Svelte, TypeScript, SCSS) reload instantly.
- Backend Rust code changes trigger an automatic recompilation and relaunch of the desktop process.

---

## Frontend-Only Development

If working exclusively on UI components, styling, or localization where native backend commands can be mocked:

```bash
npm run dev
```

Open `http://localhost:14440` in your web browser.

---

## Verification & Checks

Before submitting any pull request or committing changes, run the project validation suite:

```bash
# 1. Type check and lint frontend components
npm run check

# 2. Verify i18n locale parity across all languages
npm run check:i18n

# 3. Test building the frontend static production bundle
npm run build

# 4. Check Rust backend syntax and compiler warnings
cd src-tauri
cargo check

# 5. Run Rust unit tests
cargo test
```
