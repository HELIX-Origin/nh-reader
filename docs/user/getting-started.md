# Getting Started with NH Reader

NH Reader is a native desktop application designed for fast, distraction-free browsing and reading of manga and doujinshi from nhentai.net.

---

## Key Features

- **Blazing Fast Native Interface**: Built with Tauri v2 and Svelte 5 for instant startup and negligible memory footprint.
- **Full Catalog Browsing**: Browse the latest releases, filter by popularity (all time, weekly, daily), or jump directly to a random gallery.
- **Robust Client-Side Blacklist**: Filter out unwanted tags, artists, characters, and languages everywhere in the application—including searches and random selection.
- **Flexible Reader Engine**: Single-page, double-page (manga mode), and continuous vertical webtoon scroll with configurable keyboard shortcuts.
- **Local Download Manager**: Download full galleries for offline reading with background queue management and automatic resume.
- **Strict Privacy**: Zero tracking, zero telemetry, local-only SQLite storage, and secure cookie/credential persistence.
- **Multi-language Support**: Drop-in internationalization supporting 17+ languages out of the box.

---

## System Requirements

| Operating System | Minimum Version | Recommended Architecture |
| :--- | :--- | :--- |
| **Windows** | Windows 10 (Build 19041+) or Windows 11 | x64 / ARM64 (WebView2 Runtime required) |
| **macOS** | macOS 11.0 (Big Sur) or newer | Universal binary (Intel x86_64 & Apple Silicon ARM64) |
| **Linux** | Modern glibc-based distribution (Ubuntu 22.04+, Fedora 38+, Arch Linux) | x86_64 (WebKit2GTK 4.1 required) |

---

## Quick Navigation Overview

The application interface consists of a persistent top bar and primary navigation tabs:

1. **Top Bar**:
   - **Search Input**: Type query keywords, artist names, or tags. Press `Enter` to search.
   - **Window Controls**: Minimize, maximize/restore, and close buttons integrated smoothly into the custom header.
2. **Navigation Tabs**:
   - **Browse**: The main catalog view with sorting options (Newest, Popular All Time, Popular This Week, Popular Today) and a Random Doujin button.
   - **Favorites**: Your bookmarked galleries saved locally or synced with your account.
   - **History**: Chronological log of recently viewed galleries.
   - **Downloads**: Active background download queue and completed offline titles.
   - **Blacklist**: Manage rules to automatically hide unwanted tags or categories.
   - **Settings**: App preferences, reading defaults, interface scale, and locale selection.

---

## Next Steps

- Proceed to [Installation & Setup](./installation.md) for step-by-step installation instructions.
- Learn about catalog filters and search operators in [Browsing & Search](./browsing-and-search.md).
- Configure your personal exclusions in [Global Blacklist](./blacklist.md).
