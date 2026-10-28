# Testing & Quality Assurance

Quality assurance in NH Reader combines static analysis, mechanical parity checking, Rust unit testing, and automated build verification.

---

## Testing Matrix

| Layer | Tool | Command | Scope |
| :--- | :--- | :--- | :--- |
| **Frontend Types** | `svelte-check` | `npm run check` | Type correctness across Svelte 5 components and TypeScript modules |
| **i18n Parity** | `check-i18n.mjs` | `npm run check:i18n` | Key parity across all 17+ translation files (292 keys) |
| **Frontend Bundle** | `vite build` | `npm run build` | Static site compilation and asset bundling |
| **Backend Types** | `cargo check` | `cargo check` | Rust syntax, lifetimes, and dependency compilation |
| **Backend Tests** | `cargo test` | `cargo test` | Unit tests for cache, database, installer, and API parsing |

---

## Backend Unit Tests

Unit tests live alongside the Rust code in `src-tauri/src/`:

### Key Test Suites

1. **Image Cache Tests (`image_cache.rs`)**:
   - `round_trip_and_distinct_names`: Verifies SHA-256 hash generation and disk read/write cycles.
   - `prune_removes_old_only`: Validates LRU pruning behavior under disk quota limits.
2. **Installer Logic Tests (`installer.rs`)**:
   - `check_disk_space_reports_space`: Verifies cross-platform free disk space queries.
   - `detect_status_returns_valid_info`: Validates detection of existing installations.
   - `executable_name_matches_platform`: Checks platform binary naming.
   - `uninstaller_name_matches_platform`: Checks platform uninstaller binary naming.
3. **API & Parser Tests (`nh_desktop.rs`)**:
   - `deserializes_favorite_and_user_fixtures`: Tests parsing of user profile and favorite responses.
   - `deserializes_gallery_detail_from_v2_fixture`: Validates gallery detail JSON deserialization against real-world fixtures.
   - `deserializes_gallery_list_from_v2_fixture`: Validates search/browse list parsing.
   - `parses_only_https_allowlisted_image_hosts`: Ensures non-whitelisted image URLs are rejected for security.

### Running Backend Tests
```bash
cd src-tauri
cargo test -- --nocapture
```

---

## Zero-Warning Policy

NH Reader enforces a strict zero-warning policy across all tooling:
- Compilers must complete with **0 errors and 0 warnings**.
- `svelte-check` must report **0 errors and 0 warnings**.
- Linters and bundlers must output zero warnings.
- Pull requests generating new warnings will fail automated CI checks.
