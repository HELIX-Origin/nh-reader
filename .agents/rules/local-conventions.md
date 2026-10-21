# Local Conventions — nh-reader

## Layout

- Rust backend: `src-tauri/` (`commands.rs`, `nh_desktop.rs`, `db.rs`, `service.rs`,
  `image_cache.rs`, `installer.rs`, `error.rs`, `platform/`).
- Frontend: `src/` SvelteKit SPA — `src/lib/` flat modules (`api`, `client`, `types`, `query`,
  `cache`, `image`, `format`), `src/lib/i18n/`, `src/lib/components/`, `src/lib/design/`,
  `src/lib/stores/`, and `src/routes/`.
- All Tauri commands are registered in `src-tauri/src/lib.rs` and typed on the frontend.

## Frontend

- Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`); strict TypeScript.
- Plain CSS with design tokens (`src/lib/design/tokens.css`); no CSS frameworks.
- kebab-case files/folders; PascalCase component names; prefer `$lib/` imports.
- Do not add comments unless explicitly requested; prefer self-documenting names.
- Localization is drop-in: a locale is a single `src/lib/i18n/<locale>.json` file.

## Backend

- Rust `snake_case`; small, focused modules.
- Never panic across the Tauri command boundary — return `Result`.
- Respect nhentai.net: throttle requests; never hammer the site or its API.
- Keep the CSP allow-list and API-key handling secure; never commit secrets.
- Persist user data locally in SQLite; no telemetry, cloud sync, or third-party trackers.

## Verification

- `npm test` (or `npm run verify`) must be green before merge.
- Zero warnings: `RUSTFLAGS="-D warnings"` for Rust and `npm run check` for Svelte/TypeScript.
- Never commit generated bundles (`build/`, `.svelte-kit/`, `src-tauri/target/`); CI builds them.
