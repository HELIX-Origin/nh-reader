# Workflows — nh-reader

Common development workflows. Follow these steps exactly; they encode the invariants from
`local-conventions.md` and `rules/verification.md`.

---

## 1. Adding a Tauri command

1. **Define the handler** in `src-tauri/src/commands.rs`:
   ```rust
   #[tauri::command]
   pub async fn my_command(
       state: tauri::State<'_, AppState>,
       arg: String,
   ) -> Result<MyResult, AppError> {
       service::do_thing(&state.db, &arg).await
   }
   ```
2. **Add business logic** in the appropriate module (`service.rs`, `nh_desktop.rs`, etc.).
   Keep `commands.rs` thin — no logic there.
3. **Register the command** in `src-tauri/src/lib.rs` inside `.invoke_handler(tauri::generate_handler![…])`.
4. **Add the TypeScript type** in `src/lib/types/<module>.ts` mirroring the Rust struct.
5. **Add the frontend wrapper** in `src/lib/api/<module>.ts`:
   ```ts
   import { invoke } from '@tauri-apps/api/core';
   import type { MyResult } from '$lib/types/<module>';

   export async function myCommand(arg: string): Promise<MyResult> {
     return invoke('my_command', { arg });
   }
   ```
6. **Run the verification gate** — `npm test` must be green before committing.

---

## 2. Adding an i18n key

1. **Add the key** to `src/lib/i18n/en.json` (canonical source):
   ```json
   { "reader.my_new_label": "My Label" }
   ```
2. **Add the same key** to every other locale file in `src/lib/i18n/` with a translated value
   (or a placeholder if translation is pending — mark it with a `// TODO` comment in your PR).
3. **Use the key** in the component via the i18n helper (do not inline the English string).
4. Run `npm run check:i18n` — it must report zero missing keys.

---

## 3. Adding a new locale

1. Create `src/lib/i18n/<locale-code>.json` (e.g. `ko.json`).
2. Copy all keys from `en.json` and provide translated values.
3. Register the locale in the i18n initialization (see existing locales for the pattern).
4. Run `npm run check:i18n` — the new locale must appear clean.

---

## 4. Fixing a Rust warning

1. Run `RUSTFLAGS="-D warnings" cargo check --manifest-path src-tauri/Cargo.toml` to get the
   exact warning location and message.
2. Common fixes:
   - Unused import → remove the `use` line.
   - Unused variable → prefix with `_` or remove.
   - Dead code → either remove or add `#[allow(dead_code)]` with a comment explaining why.
   - Clippy suggestion → follow the suggestion unless there is a documented reason not to.
3. Re-run `cargo check` with `RUSTFLAGS="-D warnings"` until it exits clean.
4. Run `cargo test` to confirm no regressions.

---

## 5. Updating the SQLite schema

1. Identify the highest-numbered migration file in `src-tauri/migrations/`.
2. Create a **new** numbered file: `src-tauri/migrations/<N+1>_<description>.sql`.
3. Write forward-only SQL (no `DROP COLUMN`, no destructive rewrites of existing tables).
   If removing a column is necessary, create a shadow table and migrate data.
4. **Never edit an existing migration file.** The migration runner checksums files.
5. Update the corresponding Rust types in `db.rs` if struct fields change.
6. Run `cargo test` — the migration test (if present) must pass.
7. Run the full gate: `npm test`.

---

## 6. Debugging a Rust panic or error

1. Run `RUST_BACKTRACE=1 cargo test --manifest-path src-tauri/Cargo.toml` to get a full trace.
2. Check `error.rs` — ensure the error variant has a proper `From` impl so it surfaces correctly.
3. Never use `.unwrap()` or `.expect()` in command handlers — use `?` propagation.
4. For async command issues, check that `AppState` is `Send + Sync` and that locks are released
   before any `await` point.

---

## 7. Adding Android-specific code

1. Open (or create) `src-tauri/src/platform/android.rs`.
2. Gate all code with `#[cfg(target_os = "android")]`.
3. Export via `platform/mod.rs` under the same cfg gate.
4. Add a stub (or no-op) in `platform/desktop.rs` under `#[cfg(not(target_os = "android"))]`
   so the desktop build still compiles.
5. Run `cargo check` on the host target and confirm CI Android target also passes.
