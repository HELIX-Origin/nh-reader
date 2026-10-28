# nh-reader — Task Checklist & Workstream Tracking

> 📋 **Living Source of Truth**: Actionable task ledger for **NH Reader** (`nh-reader`).
> Statuses: ⬜ backlog · 🚧 in progress · ✅ done (tracked as `- [ ]` and `- [x]` checkboxes).
> High-level direction lives in [`ROADMAP.md`](./ROADMAP.md), active sprints in [`PLAN.md`](./PLAN.md), issues in [`BUGS.md`](./BUGS.md).

> [!IMPORTANT]
> AI agents are strictly required to update this page and related tracking ledgers **before** executing new feature work or bug fixes and keep them synchronized.

---

## 📜 Tracking Rules

- **No Typo Duplication**: When recording user reports, clean and fix all typos to preserve professional quality.
- **Consistent Formatting**: Maintain consistent formatting and style throughout all documentation.
- **Clear Sectioning**: Use clear and descriptive headers for each section.
- **Active Items First**: The currently active workstream must always be placed at the top of the content sections.
- **Improve & Categorize User Directives**: Rewrite user directives into clean, self-contained engineering requirements grouped by domain sub-headers. Never dump raw chronological chat quotes or leave contradictory superseded statements.
- **100% Active Direction Accuracy**: Whenever a requirement pivots or supersedes an earlier decision, replace the superseded directive in place across `ROADMAP.md`, `PLAN.md`, `TODO.md`, and `BUGS.md`.
- **Same-Change Updates**: When a task changes behavior or scope, update this file **in the same change**.
- **Done Moves Down**: When a workstream is done, check it off and collapse it to a concise single-line summary under Completed Workstreams, leaving detailed historical records in `CHANGELOG.md`.
- **Explicit Project Tagging**: Every workstream header, checklist group, and individual checkbox item MUST be prefixed with `[nh-reader]`.
- **Tracking Docs Stay True**: Update `ROADMAP.md`, `TODO.md`, `BUGS.md`, and `PLAN.md` first or in lockstep with code changes.
- **Always Track Everything**: Every new feature request, enhancement, or bug report must be logged before execution.

---

## 🔥 Active Workstreams

### `[nh-reader]` — Sprint 2: Tauri v2 Performance Optimization & Browse/Navigation Modernization
- [x] `[nh-reader]` **SQLite Index Optimization & High-Performance Pragmas**: Enabled WAL journal mode, NORMAL sync, memory temp store, 64MB page cache, 256MB mmap, and `idx_kv_updated_at` in `db.rs`.
- [x] `[nh-reader]` **Download & ZIP/CBZ Streaming Speedup**: Switched gallery download archive writer to `Stored` compression in `service.rs` (skipping redundant JPEG/WebP deflation) and cached archive page counts in `commands.rs` to eliminate heavy synchronous disk reads.
- [x] `[nh-reader]` **Svelte 5 Grid Virtualization & Lazy Rendering**: Added keyed `each (g.id)` to `GalleryGrid.svelte`, async image decoding & low fetchpriority to `CoverImage.svelte` and `ReaderImage.svelte`, and bounded LRU `blobCache` in `image.ts` to prevent memory leaks.
- [x] `[nh-reader]` **Blacklist Tag Button-Chip Grid & Alphabetical Sorting**: Upgraded tag picker in `BlacklistView.svelte` to a responsive uniform grid with squared button chips (`border-radius: var(--radius-sm, 6px)`), distinct tactile surface shading (`var(--surface-hover)`), wide layout (`max-width: 1400px`), and default alphabetical (`A–Z`) ordering with an interactive sort toggle.
- [x] `[nh-reader]` **Modular SCSS Architecture Migration**: Installed `sass-embedded`, migrated flat 2,300-line `app.css` into modular SCSS under `src/styles/` (`_tokens.scss`, `_mixins.scss`, `_tags.scss`, `_base.scss`, `_components.scss`, `_layout.scss`, and `views/*`), and mapped `$styles` path alias.
- [x] `[nh-reader]` **Browse Tab Navigation & Popularity Sorting Pivot**: Retired dedicated `/popular` tab in favor of a unified "Browse" tab (`/`) with a `compass` icon, integrated popularity sorting options (`Newest`, `Popular`, `Popular This Week`, `Popular Today`), automatic redirect from legacy `/popular`, and a "Random Doujin" button strictly respecting active blacklist filters.
- [x] `[nh-reader]` **Zero-Warning Gate**: Verified 0 errors and 0 warnings under `svelte-check`, `vite build`, and 7/7 tests passed in `cargo test`.

### `[nh-reader]` — v0.8.0 Release Preparation
- [x] `[nh-reader]` **i18n Parity**: Added the 13 new Browse/Back keys to all 17 community locale packs (`check:i18n` parity restored).
- [x] `[nh-reader]` **Version Bump to v0.8.0**: `package.json`, `package-lock.json`, `src-tauri/Cargo.toml`, `src-tauri/Cargo.lock`, `src-tauri/tauri.conf.json`, `CITATION.cff`, `PRIVACY.md`, `TOS.md`.
- [x] `[nh-reader]` **Detailed `docs/` Folder**: Extensive, self-contained user and developer documentation (`docs/README.md`, 11 user guides, 10 developer guides), verified against the code, theme-neutral, with no references to retired hub sites.
- [x] `[nh-reader]` **Retired Hub Link Cleanup**: Replaced retired documentation/wiki hub links in `README.md`, `SUPPORT.md`, `CONTRIBUTING.md`, `CITATION.cff`, and `.github/ISSUE_TEMPLATE/config.yml` with links to `docs/`.
- [x] `[nh-reader]` **Stale Documentation Corrections**: Aligned `CONTRIBUTING.md` and project-local conventions with the SCSS architecture (`src/styles/`) and the actual `src-tauri/src` module list.
- [x] `[nh-reader]` **Release Workflow Audit**: Removed hardcoded fallback tag in `.github/workflows/release.yml`, added `verify` quality gate, verified cross-platform matrix packaging for Windows, macOS, Linux.
- [x] `[nh-reader]` **Release Documents**: `CHANGELOG.md` v0.8.0 entry, `.github/releases/v0.8.0.md`, and `.github/discussions/announcements/v0.8.0.md`.
- [ ] `[nh-reader]` **Commit & Push**: Single authorized commit pushed to `origin/main` and verified with `git ls-remote`.
- [ ] `[nh-reader]` **Tag & GitHub Release `v0.8.0`**: Tag `v0.8.0` and release creation to trigger cross-platform matrix installer attachments.

---

## ⬜ Backlog / Candidate Tasks

### `[nh-reader]` — Milestone M13 Candidates
- [ ] `[nh-reader]` **Tag Frequency Analytics**: Local reading-history analytics showing top consumed tags, artists, and languages.
- [ ] `[nh-reader]` **Multi-Profile Partitioning**: Allow switching between isolated library/blacklist profile stores.
- [ ] `[nh-reader]` **Background Update Inspection**: Non-intrusive GitHub release notification check on app launch.
- [ ] `[nh-reader]` **Unified Scripts Standard**: Ensure all maintenance scripts follow canonical `main:sub:option` naming and `.mjs` conventions.

---

## ✅ Completed Workstreams & Archive

### ✅ `[nh-reader]` Workstream W.01: Project-Local Ecosystem & Tracking Migration (2026-10-19)
- **Project Identifier:** `[nh-reader]`
- **Repository Path:** `projects/nh-reader`

- [x] `[nh-reader]` Added `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `GOVERNANCE.md`, and `.github/pull_request_template.md`.
- [x] `[nh-reader]` Added `AGENTS.md`, `.agents/rules/local-conventions.md`, and `.github/copilot-instructions.md`.
- [x] `[nh-reader]` Migrated `ROADMAP.md`, `PLAN.md`, `TODO.md`, `BUGS.md`, and `HANDOFF.md`.
- [x] `[nh-reader]` Refreshed stale URLs and removed external/workspace references from existing docs.

---

## 🔖 Metadata

- **Project**: nh-reader
- **Tracking Status**: Clean — no active workstream; M13 backlog ready.
