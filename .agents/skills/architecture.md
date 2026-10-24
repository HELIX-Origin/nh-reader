# Architecture — nh-reader

## Directory map

```
nh-reader/
├── src-tauri/
│   ├── Cargo.toml
│   ├── tauri.conf.json               # shared Tauri config
│   ├── tauri.windows.conf.json       # Windows NSIS packaging
│   ├── tauri.macos.conf.json         # macOS DMG packaging
│   ├── tauri.linux.conf.json         # Linux deb/AppImage packaging
│   ├── capabilities/default.json     # Tauri v2 ACL (least-privilege)
│   ├── migrations/                   # SQLite forward-only migration files
│   └── src/
│       ├── lib.rs                    # Tauri builder, plugin setup, command registration
│       ├── commands.rs               # All #[tauri::command] handlers (thin layer)
│       ├── nh_desktop.rs             # nhentai.net API client (search, gallery, doujin)
│       ├── db.rs                     # SQLite connection pool, migration runner
│       ├── service.rs                # Business logic orchestration
│       ├── image_cache.rs            # Disk-backed image cache, fetch + serve pipeline
│       ├── installer.rs              # App update / self-install helpers
│       ├── error.rs                  # AppError enum; all command errors derive From here
│       └── platform/
│           ├── mod.rs                # Shared platform traits & exports
│           ├── android.rs            # #[cfg(target_os = "android")] — Android paths, intents
│           └── desktop.rs            # #[cfg(not(target_os = "android"))] — desktop helpers
├── src/
│   ├── lib/
│   │   ├── api/                      # Frontend wrappers for Tauri invoke calls
│   │   ├── client/                   # HTTP fetch helpers (desktop proxied through Rust)
│   │   ├── types/                    # Shared TypeScript types (mirrors Rust structs)
│   │   ├── query/                    # Query builders / cache keys
│   │   ├── cache/                    # Frontend in-memory caches
│   │   ├── image/                    # Image helpers (URL resolution via Tauri asset protocol)
│   │   ├── format/                   # Formatters (dates, counts, tags)
│   │   ├── i18n/                     # Locale JSON files: en.json, ja.json, zh-CN.json, …
│   │   ├── components/               # Svelte components (PascalCase.svelte)
│   │   ├── design/tokens.css         # CSS custom properties (design tokens)
│   │   └── stores/                   # Svelte stores (settings, session, history)
│   └── routes/                       # SvelteKit file-based routes
│       ├── +layout.svelte            # App shell, titlebar, nav
│       ├── +page.svelte              # Home / reader landing
│       ├── reader/[id]/+page.svelte  # Doujin reader view
│       └── settings/+page.svelte     # Settings UI
├── scripts/
│   ├── lib/runner.mjs                # Shared process spawner, ANSI output, timing
│   ├── dev.mjs                       # Dev orchestrator
│   ├── build.mjs                     # Production build
│   └── test.mjs                      # Full gate runner
└── package.json                      # npm scripts (main:sub naming convention)
```

## Tauri command flow

```
Frontend (Svelte)
  └─ invoke("command_name", { arg })        // src/lib/api/<module>.ts
       │
       ▼
Tauri IPC bridge (capabilities/default.json grants access)
       │
       ▼
commands.rs  #[tauri::command]              // thin handler; delegates immediately
  └─ service.rs / nh_desktop.rs / db.rs    // business logic
       │
       ▼  Ok(T) | Err(AppError)
Frontend receives typed Result
```

- All commands return `Result<T, AppError>`. `AppError` implements `Serialize` so errors surface
  in the frontend as structured objects.
- Command names are `snake_case` in Rust; the frontend uses `camelCase` aliases via `invoke`.
- Types must stay in sync: change the Rust struct → update the TypeScript type in `src/lib/types/`.

## SQLite schema & migrations

- Schema lives in `src-tauri/migrations/` as numbered SQL files (`0001_init.sql`, `0002_...sql`).
- The migration runner in `db.rs` applies them in order at startup.
- **Forward-only invariant:** never edit an existing migration file. Add a new numbered file.
- Tables: `doujin_cache` (metadata), `history` (read history), `favorites`, `settings`.

## i18n file structure

```
src/lib/i18n/
├── en.json    # canonical source of truth — add new keys here first
├── ja.json
├── zh-CN.json
└── …          # each additional locale is one JSON file
```

- Keys are dot-namespaced strings, e.g. `"reader.next_page"`.
- `npm run check:i18n` diffs every locale against `en.json` and errors on missing keys.
- Never reference a key that does not exist in `en.json`; the build will warn.

## Image cache lifecycle

```
Frontend requests image URL
  └─ invoke("get_cached_image", { url })
       │
       ▼
image_cache.rs
  ├─ Cache hit?  → return local asset:// URI immediately
  └─ Cache miss? → fetch from nhentai CDN (throttled)
                   → write to disk cache
                   → return asset:// URI
```

- Images are served via the Tauri `asset://` custom protocol, never as base64 or data URIs.
- Cache directory: `$APP_DATA/image_cache/`.
- The frontend **never** fetches images directly from nhentai.net; all fetches go through
  `get_cached_image` (or the equivalent image command).

## Android specifics

- Android builds use `#[cfg(target_os = "android")]` guards in `platform/android.rs`.
- Desktop builds use `#[cfg(not(target_os = "android"))]` guards in `platform/desktop.rs`.
- Never put Android-only code outside `platform/android.rs`.
- Both targets must compile cleanly — `cargo check` runs for the host target; CI checks Android.
