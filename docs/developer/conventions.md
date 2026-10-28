# Coding Conventions & Standards

This document establishes the architectural rules, coding conventions, and contribution standards for NH Reader.

---

## General Conventions

- **LF Line Endings**: All text files must use standard Unix line endings (`LF`). Windows line endings (`CRLF`) are forbidden.
- **Self-Documenting Code**: Avoid redundant or obvious code comments. Prefer expressive variable and function names.
- **Theme Neutrality**: Never hardcode colors, theme tokens, or vendor-specific styles. Reference semantic variables from `src/styles/_variables.scss`.
- **Zero Warnings**: Treat all compiler, linter, and type checker warnings as build-blocking errors.

---

## Frontend Standards

- **Svelte 5 Runes**: Always use Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) instead of legacy Svelte 3/4 stores or reactive declarations (`$: ...`).
- **Strict Typing**: All components, stores, and API clients must be strictly typed. Avoid `any`.
- **Component File Names**: Use `PascalCase` for Svelte components (e.g. `GalleryGrid.svelte`, `ReaderImage.svelte`).
- **Module Names**: Use `kebab-case` or `snake_case` for utility files (e.g. `format.ts`, `image.ts`).
- **SCSS-First**: Use Dart Sass modular partials. Keep styles organized in `src/styles/` with clean categorization (base, layout, components, views).

---

## Backend Standards (Rust)

- **Result-Driven Boundary**: Functions exposed to Tauri via `#[tauri::command]` must return `Result<T, AppError>`. Never use `unwrap()` or `expect()` on user input or remote network responses.
- **Async Runtime**: Avoid blocking Tokio worker threads. Offload heavy CPU or disk operations to `tokio::task::spawn_blocking` when appropriate.
- **Module Structure**: Keep backend modules focused and decoupled (`nh_desktop.rs`, `db.rs`, `service.rs`, `image_cache.rs`).
- **Secure Networking**: Restrict HTTP requests to verified nhentai hostnames and enforce HTTPS strictly.

---

## Commit Message Format

Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject in imperative mood>

[optional body explaining what changed and why]

[optional footer: Refs #123]
```

### Common Types:
- `feat`: New user-facing feature or enhancement.
- `fix`: Bug fix.
- `docs`: Documentation updates.
- `perf`: Performance improvements.
- `refactor`: Internal code reorganization with no functional changes.
- `style`: Formatting or styling fixes.
- `test`: Adding or updating test cases.
- `chore`: Tooling, build pipeline, or dependency updates.

### Allowed Scopes:
`browse`, `reader`, `search`, `blacklist`, `favorites`, `downloads`, `history`, `account`, `settings`, `i18n`, `ui`, `installer`, `backend`, `ci`.
