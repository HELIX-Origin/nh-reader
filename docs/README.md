# NH Reader Documentation

Welcome to the comprehensive documentation for **NH Reader** (`nh-reader`), a modern, lightweight, high-performance desktop client for nhentai.net built with Tauri v2, Rust, Svelte 5, and TypeScript.

---

## Documentation Structure

### User Guide
Documentation designed for end users, explaining features, setup, and troubleshooting.

- [Getting Started](./user/getting-started.md): Quick start walkthrough and system requirements.
- [Installation & Setup](./user/installation.md): Platform-specific installers (Windows, macOS, Linux), portable usage, and setup wizard.
- [Browsing & Search](./user/browsing-and-search.md): Browse catalog, sorting modes (Newest, Popular All Time/Week/Today), random doujin discovery, advanced search operators, and tags.
- [Global Blacklist](./user/blacklist.md): Client-side exclusion by tag, artist, character, language, or parody with live preview filtering.
- [Reader View](./user/reader.md): Reading modes (single, double, continuous scroll), direction controls, keyboard shortcuts, zoom, and fit modes.
- [Library, Favorites & History](./user/library-favorites-history.md): Managing saved galleries, account favorites synchronization, and browsing history.
- [Downloads & Offline Viewing](./user/downloads.md): Background download queues, export directory structures, and offline viewing.
- [Account & Session](./user/account-and-api-key.md): Optional session cookie configuration, Cloudflare clearance, and remote synchronization.
- [Settings & Customization](./user/settings.md): UI density, theme mode, default zoom, proxy settings, and locale options.
- [Privacy & Data Security](./user/privacy-and-data.md): Local SQLite storage, zero telemetry policy, credential handling, and clearing cached data.
- [Troubleshooting & FAQ](./user/troubleshooting.md): Common network issues, Cloudflare challenges, image loading problems, and crash recovery.

---

### Developer Guide
Documentation for contributors and maintainers building, testing, or extending NH Reader.

- [Architecture Overview](./developer/architecture.md): Tauri v2 bridge, IPC boundaries, frontend-backend split, and thread model.
- [Frontend Architecture](./developer/frontend.md): Svelte 5 runes (`$state`, `$derived`, `$effect`), SvelteKit SPA routing, and SCSS structure.
- [Backend Architecture](./developer/backend.md): Rust core, command handlers, async Tokio runtime, and service workers.
- [Data & Persistence](./developer/data-and-storage.md): SQLite database schema, migrations, transactions, and LRU image disk cache.
- [nhentai API & Scraping](./developer/nhentai-api.md): Endpoints, rate limiting, request throttling, session headers, and payload structures.
- [Internationalization (i18n)](./developer/i18n.md): Drop-in JSON localization system, key conventions, and validation tooling.
- [Development Setup](./developer/development-setup.md): Prerequisites, repository setup, local dev server, and debugging workflows.
- [Build & Release Engineering](./developer/build-and-release.md): Cross-platform CI matrix, NSIS packaging, DMG creation, and Debian packaging.
- [Testing & Quality Assurance](./developer/testing.md): Rust unit tests, frontend typechecks, i18n parity validation, and smoke tests.
- [Coding Conventions & Standards](./developer/conventions.md): Code style, commit guidelines, error handling rules, and PR checklist.
