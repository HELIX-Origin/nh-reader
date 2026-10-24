# Local Conventions — nh-reader

## Layout

- **Rust backend:** `src-tauri/src/` — `commands.rs`, `nh_desktop.rs`, `db.rs`, `service.rs`,
  `image_cache.rs`, `installer.rs`, `error.rs`, `platform/` (platform-specific modules).
- **Frontend:** `src/` SvelteKit SPA:
  - `src/lib/` — flat modules: `api`, `client`, `types`, `query`, `cache`, `image`, `format`
  - `src/lib/i18n/` — locale JSON files (`en.json`, `ja.json`, …)
  - `src/lib/components/` — Svelte components
  - `src/lib/design/` — `tokens.css` (CSS custom properties)
  - `src/lib/stores/` — Svelte stores
  - `src/routes/` — SvelteKit file-based routes
- All Tauri commands are registered in `src-tauri/src/lib.rs` and typed on the frontend.

## Frontend

- **Svelte 5 runes** (`$state`, `$derived`, `$effect`, `$props`); strict TypeScript throughout.
- **Plain CSS design tokens** (`src/lib/design/tokens.css`); no CSS frameworks (no Tailwind, no UnoCSS).
- `kebab-case` files/folders; `PascalCase` component names; prefer `$lib/` imports.
- Do not add comments unless explicitly requested; prefer self-documenting names.
- **i18n — mandatory:** every user-visible string must have a locale key. Never hardcode display
  text in components. Locale files live at `src/lib/i18n/<locale>.json` (a locale is a single
  drop-in JSON file). Run `npm run check:i18n` to verify all keys are present across all locales.

## Backend

- **Rust `snake_case`**; small, focused modules.
- **Never panic across the Tauri command boundary** — always return `Result<T, E>`.
- **Respect nhentai.net:** throttle requests; never hammer the site or its API.
- **Image caching:** always route image fetching through `image_cache.rs`. The frontend must never
  fetch images directly from `nhentai.net` — all image requests go through a Tauri command that
  delegates to `image_cache.rs`.
- **Android:** platform-specific code lives in `src-tauri/src/platform/android.rs` and is gated
  with `#[cfg(target_os = "android")]`. Desktop-only code uses
  `#[cfg(not(target_os = "android"))]`. Keep the `platform/` module boundary clean.
- **SQLite migrations** are forward-only. Never modify an existing migration file; always add a new
  one. Migration files live in `src-tauri/migrations/`.
- Keep the CSP allow-list and API-key handling secure; **never commit secrets**.
- Persist user data locally in SQLite; no telemetry, cloud sync, or third-party trackers.
- Treat remote metadata as **untrusted input** — validate and sanitize before persisting.

## Verification gate

Run before every merge (see `.agents/rules/verification.md` for full commands):

```
RUSTFLAGS="-D warnings" cargo check --manifest-path src-tauri/Cargo.toml
cargo test --manifest-path src-tauri/Cargo.toml
npm run check        # svelte-check — 0 errors, 0 warnings
npm run check:i18n   # all locale keys present
npm run build        # production Vite build
```

`npm test` (or `npm run verify`) runs the full gate in one shot.

## General

- **Never commit generated bundles** (`build/`, `.svelte-kit/`, `src-tauri/target/`); CI builds them.
- Zero warnings across Rust and TypeScript/Svelte — warnings are treated as errors.
