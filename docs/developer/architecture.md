# Architecture Overview

NH Reader is built on top of the **Tauri v2** framework, combining a high-performance native **Rust** backend with a modern **Svelte 5** frontend running inside an embedded system webview.

---

## Architectural Principles

1. **Strict Process Boundary**: The frontend webview is treated as an untrusted presentation layer. It performs no direct network I/O to external domains and has zero filesystem access. All privileged operations occur within the Rust backend via strongly typed Tauri IPC commands.
2. **Zero-Overhead Native Performance**: Memory footprint is kept minimal (<60 MB idle RAM) by leveraging system webviews (WebView2 on Windows, WebKit on macOS, WebKit2GTK on Linux) and native Rust threads instead of Chromium bundles.
3. **Resilient Persistence**: All data is stored in a transactional SQLite engine with poison-recovered mutexes, automatic schema migrations, and zero external database dependencies.
4. **Theme Neutrality**: The UI layer relies on semantic SCSS variables and responsive layouts, maintaining neutrality and mod-agnostic styling.

---

## High-Level Topology

```mermaid
graph TD
    subgraph Frontend["Frontend (SvelteKit SPA / Svelte 5)"]
        UI[Views & Components]
        Stores[Runes Stores: Locale, Nav, Settings]
        Client[Tauri IPC Bridge: lib/api.ts]
    end

    subgraph IPC["Tauri v2 IPC Boundary"]
        Commands[Strongly Typed Commands (commands.rs)]
    end

    subgraph Backend["Backend (Rust / Tokio Runtime)"]
        Service[Background Service Worker]
        ImageCache[LRU Image Disk Cache]
        NHDesktop[nhentai API Client (reqwest)]
        Database[SQLite Engine (rusqlite)]
    end

    subgraph Storage["Local Storage"]
        DBFile[(data.db)]
        CacheFiles[(Disk Cache)]
        DownloadFiles[(Downloaded Manga)]
    end

    subgraph Network["External Network"]
        NHNet[nhentai.net API & CDNs]
    end

    UI --> Stores
    Stores --> Client
    Client -->|invoke command| Commands
    Commands --> NHDesktop
    Commands --> Database
    Commands --> ImageCache
    Commands --> Service
    Service --> NHDesktop
    Service --> ImageCache
    Service --> DownloadFiles
    ImageCache --> CacheFiles
    Database --> DBFile
    NHDesktop -->|HTTPS / sessionid| NHNet
```

---

## Threading & Runtime Model

- **Main Thread**: Manages the native window event loop, system tray integration, window dragging/resizing, and native menu handling.
- **Tokio Asynchronous Runtime**: Executes all asynchronous tasks including HTTP networking, JSON parsing, disk I/O, and image downloading.
- **Background Worker Loop**: Runs inside an isolated Tokio task to process sequential download queues and cache eviction without blocking UI responsiveness.
- **Webview Render Thread**: Renders the Svelte 5 application at native display refresh rates.

---

## Security Model & Boundary Controls

- **Content Security Policy (CSP)**: Tauri enforces a strict CSP. Scripts cannot be evaluated from remote CDNs, inline script eval is disabled, and font/asset loading is restricted to local app schemes.
- **Network Isolation**: The frontend makes zero `fetch()` or `XMLHttpRequest` calls to the internet. Every image, metadata request, and search query is routed through Tauri IPC commands, allowing the Rust layer to inspect headers, attach session cookies safely, and enforce rate limits.
- **Zero Panic Guarantee**: Commands across the Tauri IPC boundary return `Result<T, AppError>`. Backend errors are serialized into structured JSON error payloads, preventing backend panics from taking down the frontend UI.
