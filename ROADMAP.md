# nh-reader — Roadmap & Milestones

> 🗺️ **Living Source of Truth**: Product direction, positioning principles, and milestone delivery history for **NH Reader** (`nh-reader`).
> Pair with [`PLAN.md`](./PLAN.md) (sprint execution), [`TODO.md`](./TODO.md) (task ledger), and [`BUGS.md`](./BUGS.md) (issues and quirks).

> [!IMPORTANT]
> AI agents are strictly required to update this page and related tracking ledgers **before** executing new feature work or bug fixes and keep them synchronized.

---

## 📜 Tracking Rules

- **100% Active Direction Accuracy**: `ROADMAP.md`, `PLAN.md`, `TODO.md`, and `BUGS.md` must reflect the current active direction with zero contradictions. Immediately replace or remove superseded statements.
- **Zero External Mentions**: Never directly mention by name any external, third-party, or deleted projects or repositories.
- **No Typo Duplication**: When recording user reports or directives, clean and fix all typos to preserve professional quality.
- **Explicit Project Tagging**: Every milestone, sprint, task, or deliverable header and row MUST explicitly include the project name `[nh-reader]`.
- **Bare Minimal Root & Normalized Archive**: Keep this file focused on active and upcoming milestones; archive delivered milestone narratives into `.github/ROADMAP-ARCHIVE.md` when detail accumulates.

---

## 🔭 Vision & Positioning Principles

1. **Core Value Proposition**: A lightweight, modern, cross-platform client for nhentai.net with fast search, powerful filtering, a global blacklist, and a private local-first architecture.
2. **Design Principles**:
   - **Local-first privacy**: no accounts, telemetry, cloud sync, or third-party trackers; user data stays in local SQLite.
   - **Fast and fluent browsing**: responsive grids, streaming search, and a paged reader.
   - **Respectful integration**: throttle upstream requests and never hammer nhentai.net.
3. **Non-Goals & Boundaries**:
   - Not a content host or proxy service; all gallery data originates from nhentai.net.
   - No accounts, cloud sync, advertising, or analytics, and no abuse of upstream APIs.

---

## 🗺️ Milestone Overview

| # | Milestone | Status | Release / Target | Focus |
|---|---|---|---|---|
| **M1–M12** | `[nh-reader]` Core client & localization | ✅ Shipped | v0.1.0 – v0.7.5 | Foundation, browse, search, blacklist, SQLite cache, reader, storage budgets, 18-language i18n, title bar, NSIS installer, signing |
| **M13** | `[nh-reader]` Post-v0.7.5 enhancements | ⏳ Planned | Next minor | Tag analytics, multi-profile partitions, background update inspection, unified scripts |

The delivery arc from shipped milestones to planned work:

```mermaid
flowchart LR
    shipped[M1–M12 shipped] --> m13[M13 planned]
    m13 --> analytics[Tag analytics]
    m13 --> profiles[Multi-profile]
    m13 --> updates[Update inspection]
    m13 --> scripts[Unified scripts]
```

---

## 🔮 Planned & Future Milestones

### `[nh-reader]` — Milestone M13: Post-v0.7.5 Enhancements
- ⏳ **Tag Frequency Analytics**: local reading-history analytics for top tags, artists, and languages.
- ⏳ **Multi-Profile Partitioning**: switch between isolated library/blacklist profile stores.
- ⏳ **Background Update Inspection**: non-intrusive GitHub release notification on app launch.
- ⏳ **Unified Scripts Standard**: canonical `main:sub:option` naming and `.mjs` maintenance scripts.

---

## 📌 Historical Milestones & Shipped Releases

### `[nh-reader]` — Milestones M1–M12 (v0.1.0 – v0.7.5)
- ✅ Core foundation, browse, advanced query search, blacklist stream buffering, SQLite cache,
  responsive reader, storage budgets, 18-language localization core, custom title bar,
  NSIS installer polish, and unified `npm run sign`.

---

## 🔖 Metadata

- **Project / Scope**: `nh-reader` — Tauri v2 desktop & Android reader (Rust + SvelteKit)
- **Tracking Mode**: SemVer (`vMAJOR.MINOR.PATCH`)
- **Governance**: Governed by this repository's `AGENTS.md`, `.agents/` rules, and `GOVERNANCE.md`.
