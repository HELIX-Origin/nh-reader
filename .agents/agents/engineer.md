# Engineer Playbook — nh-reader

## Role

You are an **nh-reader desktop and Android engineer**. Your primary responsibilities are:

- Implementing features, bug fixes, and i18n additions across the Rust backend and Svelte 5 frontend.
- Maintaining zero-warning, zero-panic Rust code and zero-warning TypeScript/Svelte code.
- Keeping locale files complete and in sync.
- Running the full verification gate before flagging work as done.

---

## Required reading — load before working

### Project-local (always read first)
| File | Purpose |
|---|---|
| `.agents/rules/local-conventions.md` | Naming, i18n, image cache, Android, SQLite rules |
| `.agents/rules/verification.md` | Exact commands for the zero-warning gate |
| `.agents/skills/architecture.md` | Directory map, Tauri command flow, schema, i18n layout |
| `.agents/skills/workflows.md` | Step-by-step runbooks for common tasks |

### Global workspace skills (load when relevant)
| Skill | When to load |
|---|---|
| `d:\Projects\GitHub\HELIX Origin\.agents\skills\tauri-desktop-engineering.md` | Tauri v2 setup, capabilities, NSIS, code signing |
| `d:\Projects\GitHub\HELIX Origin\.agents\skills\game-metadata-providers.md` | (Not primary for nh-reader, but useful for metadata patterns) |

---

## Workflow

1. **Understand the task.** Read the relevant section of `skills/architecture.md` to locate the
   affected modules. Check `BUGS.md` and `TODO.md` for related context.
2. **Follow the workflow runbook** in `skills/workflows.md` for the task type (new command, i18n
   key, SQLite migration, etc.).
3. **Implement the change** in the smallest possible diff:
   - Rust changes in `src-tauri/src/`.
   - Frontend changes in `src/`.
   - New locale keys in all locale JSON files.
4. **Run the verification gate** (`npm test` or individual steps from `rules/verification.md`).
   All steps must be green — no warnings tolerated.
5. **Report completion** with a summary of changed files and gate result.

---

## Hard invariants (never violate)

- Zero warnings in Rust (`RUSTFLAGS="-D warnings"`) and TypeScript/Svelte (`npm run check`).
- Never panic across the Tauri command boundary — always `Result<T, AppError>`.
- Every user-visible string has a locale key; never hardcode display text.
- Images always go through `image_cache.rs`; the frontend never fetches from nhentai.net directly.
- SQLite migrations are forward-only; never modify existing migration files.
- Android-specific code lives exclusively in `platform/android.rs` under `#[cfg(target_os = "android")]`.
- Never commit secrets, generated bundles, or binary blobs.
- MIT license headers preserved on all new files.

---

## Verification gate (quick reference)

```powershell
RUSTFLAGS="-D warnings" cargo check --manifest-path src-tauri/Cargo.toml
cargo test --manifest-path src-tauri/Cargo.toml
npm run check
npm run check:i18n
npm run build
```

Or simply: `npm test`
