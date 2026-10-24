# Verification Gate — nh-reader

> Run all commands from the repository root unless noted. All must pass with zero errors and zero
> warnings before merging any branch.

## Commands

```powershell
# 1. Rust type-check — warnings are errors
RUSTFLAGS="-D warnings" cargo check --manifest-path src-tauri/Cargo.toml

# 2. Rust test suite
cargo test --manifest-path src-tauri/Cargo.toml

# 3. Frontend type-check — 0 errors, 0 warnings required
npm run check

# 4. i18n completeness — all locale keys must be present in every locale file
npm run check:i18n

# 5. Production frontend build — must succeed cleanly
npm run build
```

## One-shot shortcut

```powershell
npm test
# or equivalently:
npm run verify
```

This runs all five steps above in sequence. A green exit means the full gate passed.

## Failure modes

| Step | Common cause | Fix |
|---|---|---|
| `cargo check` | Unused import / variable warning | Remove or prefix with `_` |
| `cargo check` | Type mismatch | Align types; check `error.rs` for `From` impls |
| `cargo test` | Logic regression | Fix failing test; do not `#[ignore]` without justification |
| `npm run check` | Svelte/TS type error or warning | Fix the type; never use `@ts-ignore` without comment |
| `npm run check:i18n` | Missing key in a locale file | Add the key to every locale JSON file |
| `npm run build` | Vite import error or missing asset | Resolve import; check `$lib/` alias |

## CI equivalent

The GitHub Actions release workflow runs the same commands. A local green gate is a reliable
predictor of a clean CI run.
