# Frontend Architecture

The frontend of NH Reader is a Single Page Application (SPA) built using **SvelteKit** with **Svelte 5** and TypeScript, compiled into a static artifact embedded in the Tauri binary.

---

## Technology Stack

- **Framework**: SvelteKit with `@sveltejs/adapter-static` (fallback to `index.html` for client-side routing).
- **Reactivity Model**: Svelte 5 Runes (`$state`, `$derived`, `$effect`, `$props`).
- **Styling Architecture**: Modern Dart Sass (`sass-embedded`) structured into modular SCSS partials.
- **Type Checking**: Strict TypeScript with `svelte-check`.
- **Localization**: Pure JSON-driven `LocaleCatalog` with dynamic locale switching and zero compile-time bundle bloat.

---

## Directory Structure

```
src/
├── app.html                     # HTML shell with viewport, CSP, and base fonts
├── lib/
│   ├── api.ts                   # Strongly typed Tauri invoke() wrappers
│   ├── client.ts                # App initialization and runtime state bindings
│   ├── types.ts                 # TypeScript interfaces for API models and DB entities
│   ├── image.ts                 # Asset URL resolution and thumbnail caching helpers
│   ├── format.ts                # Human-readable date and number formatting
│   ├── components/              # Shared UI components
│   │   ├── CoverImage.svelte    # Lazy-loaded gallery cover card
│   │   ├── GalleryGrid.svelte   # Virtualized / responsive gallery card grid
│   │   ├── Icon.svelte          # Unified SVG icon renderer
│   │   ├── Pager.svelte         # Numerical pagination and jump controls
│   │   ├── ReaderImage.svelte   # High-performance reader page renderer
│   │   ├── BlacklistView.svelte # Blacklist rule manager component
│   │   └── DownloadedView.svelte# Offline library manager
│   ├── i18n/                    # Localization modules
│   │   ├── index.ts             # LocaleCatalog loader and state provider
│   │   ├── en.json              # Canonical default English strings
│   │   └── <locale>.json        # Community drop-in locale packs
│   └── stores/                  # Global reactive stores (Svelte 5 runes)
│       ├── locale.svelte.ts     # Active language and translation lookup
│       ├── navigation.svelte.ts # Cross-view navigation state and origin tracking
│       └── settings.svelte.ts   # Persistent user preferences
├── routes/                      # SvelteKit client routes
│   ├── +layout.svelte           # Root layout: top title bar, navigation tabs, toasts
│   ├── +page.svelte             # Browse view: catalog grid, sort selector, random doujin
│   ├── gallery/[id]/+page.svelte# Gallery detail view: tag cloud, metadata, actions
│   ├── reader/+page.svelte      # Immersive reader view: single/double/scroll modes
│   └── popular/+page.svelte     # Redirect shim for backward compatibility
└── styles/                      # SCSS Architecture
    ├── _variables.scss          # Design tokens (colors, spacing, elevations, typography)
    ├── _mixins.scss             # Reusable SCSS mixins (flexbox, grid, breakpoints, text)
    ├── _base.scss               # Global reset, typography, and scrollbar styling
    ├── _layout.scss             # Top bar, navigation dock, and container layout
    ├── components/              # Component-scoped style partials
    │   ├── _buttons.scss
    │   ├── _cards.scss
    │   ├── _forms.scss
    │   └── _pager.scss
    ├── views/                   # View-specific layout partials
    │   ├── _browse.scss
    │   ├── _details.scss
    │   └── _reader.scss
    └── main.scss                # Global compilation entry point
```

---

## State Management with Svelte 5 Runes

Global stores are implemented using Svelte 5 `.svelte.ts` modules utilizing `$state`:

### Example: Navigation Store (`src/lib/stores/navigation.svelte.ts`)
```typescript
class NavigationState {
  originPath = $state('/');
  originSearch = $state('');

  setOrigin(path: string, search: string) {
    this.originPath = path;
    this.originSearch = search;
  }

  get returnUrl(): string {
    return this.originPath + this.originSearch;
  }
}

export const navigation = new NavigationState();
```

---

## Styling & SCSS Architecture

- **Theme Neutrality**: All colors and theme attributes are defined as CSS Custom Properties in `_variables.scss`.
- **Zero Inline Styles**: Layout and presentation logic are cleanly isolated in SCSS partials.
- **Responsive Breakpoints**: Grids adapt fluidly across viewport widths from 380px mobile windows up to 4K ultra-wide monitors.
