# nh-reader

Tauri v2 desktop and Android client for nhentai.net — Rust core + SvelteKit/Svelte 5 frontend.

## Project-local agents

This repository ships its own self-contained agents ecosystem (`AGENTS.md`, `.agents/`) and
tracking files (`ROADMAP.md`, `PLAN.md`, `TODO.md`, `BUGS.md`, `HANDOFF.md`). Keep them accurate
as work progresses.

## Build & test

- Rust: `cargo check` / `cargo test` (from `src-tauri/`)
- Frontend: `npm run check` (svelte-check) / `npm run build`
- Full gate: `npm test` (Rust + frontend + i18n) or `npm run verify`
- i18n: `npm run check:i18n`
- Tauri: `npm run tauri:dev`, `npm run tauri:build`

## Conventions

- Rust: zero warnings (`RUSTFLAGS="-D warnings"`); no panics across the Tauri command boundary.
- Frontend: Svelte 5 runes, strict TypeScript, plain CSS design tokens (no CSS frameworks),
  zero svelte-check warnings.
- Keep networking in the Rust backend; the WebView talks to nhentai only through Tauri commands.
- Treat remote metadata as untrusted input.
- See `.agents/rules/local-conventions.md` and `CONTRIBUTING.md`.

## Invariants

MIT license, SemVer releases, zero-warning builds, community-health files, and the
18+ content notice. See `CONTRIBUTING.md` for the full contributor guidelines.
