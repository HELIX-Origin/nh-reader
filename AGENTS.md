# nh-reader

Desktop client for nhentai.net. Currently Tauri v2 (Rust + SvelteKit); future roadmap schedules conversion into a pure native C++ Windows application targeting Windows 2000 / XP up to Windows 11+ with zero cross-platform overhead. 18+ content. MIT license.

## Build & test

| Command | Purpose |
|---|---|
| `npm run tauri:dev` | Start dev server + Tauri window |
| `npm run tauri:build` | Production Tauri bundle |
| `npm run check` | svelte-check (0 errors, 0 warnings required) |
| `npm run check:i18n` | Verify all locale keys present |
| `npm run build` | Vite production frontend build |
| `npm test` / `npm run verify` | Full gate: Rust + frontend + i18n |
| `cargo check` / `cargo test` | Run from `src-tauri/` |

## Conventions (summary)

- **Rust:** `RUSTFLAGS="-D warnings"` — zero warnings, zero panics across the Tauri command boundary.
- **Frontend:** Svelte 5 runes, strict TypeScript, plain CSS design tokens (`src/lib/design/tokens.css`), no CSS frameworks.
- **i18n:** Every user-visible string requires a locale key in `src/lib/i18n/<locale>.json`; no hardcoded display text.
- **Networking:** All nhentai.net traffic goes through the Rust backend; the WebView never contacts the remote directly.
- **Images:** Always route through `image_cache.rs`; never fetch images directly from the frontend.
- **SQLite:** Migrations are forward-only; never modify existing migration files.
- **Android:** Platform-specific code lives in `src-tauri/src/platform/android.rs` under `#[cfg(target_os = "android")]`.

See `.agents/rules/local-conventions.md` for the full conventions reference.

## Invariants

MIT license · SemVer releases · zero-warning builds · community-health files · 18+ content notice.
See `CONTRIBUTING.md` for full contributor guidelines.
