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
- **Bare Minimal Completed Entries**: Keep this file focused on active and upcoming milestones; retain delivered milestones as concise one-line entries under Historical Milestones, with full narratives in `CHANGELOG.md`.

---

## 🔭 Vision & Positioning Principles

1. **Core Value Proposition**: A lightweight, modern client for nhentai.net with fast search, powerful filtering, a global blacklist, and a private local-first architecture. Currently built with Tauri v2; future roadmap schedules conversion into a pure native C++ Windows application.
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
| **M13** | `[nh-reader]` Post-v0.7.5 enhancements | ⏳ Planned | v0.8.0 | Tag analytics, multi-profile partitions, background update inspection, unified scripts |
| **M14** | `[nh-reader]` Native C++ Windows Architecture & Scope Reduction | 🔮 Future | v1.0.0 | Convert into pure native C++ Windows desktop application; drop cross-platform/Android overhead for zero-overhead native execution |

The delivery arc from shipped milestones to planned work:

```mermaid
flowchart LR
    shipped[M1–M12 shipped] --> m13[M13 planned]
    m13 --> m14["M14 planned: Native C++ Windows pivot"]
    m14 --> win32[Pure Windows native execution]
    m14 --> drop_android[Eliminate cross-platform overhead]
```

---

## 🔮 Planned & Future Milestones

### `[nh-reader]` — Milestone M13: Post-v0.7.5 Enhancements
- ⏳ **Tag Frequency Analytics**: local reading-history analytics for top tags, artists, and languages.
- ⏳ **Multi-Profile Partitioning**: switch between isolated library/blacklist profile stores.
- ⏳ **Background Update Inspection**: non-intrusive GitHub release notification on app launch.
- ⏳ **Unified Scripts Standard**: canonical `main:sub:option` naming and `.mjs` maintenance scripts.

### `[nh-reader]` — Milestone M14: Native C++ Windows Architecture & Scope Reduction (Future)
- 🔮 **Pure Native C++ Engine**: Complete rewrite into native C++20 Win32 desktop application, leveraging Direct2D / WinUI 3 for an ultra-responsive, zero-webview reader.
- 🔮 **Windows-Only Scope Reduction**: Eliminate Android and POSIX target maintenance, focusing 100% of optimizations on Windows 11 performance, low memory footprint, and native keyboard/mouse navigation.
- 🔮 **Direct SQLite & Network Pipeline**: Native C++ WinHTTP/curl and SQLite engine with image caching pipeline.

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
