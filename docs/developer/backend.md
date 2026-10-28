# Backend Architecture

The backend of NH Reader is implemented in **Rust** using Tauri v2, providing a memory-safe, asynchronous runtime for network requests, SQLite transactions, background workers, and disk operations.

---

## Backend Modules

The Rust core is organized under `src-tauri/src/`:

```
src-tauri/src/
├── main.rs            # Entry point: handles CLI flags, installer mode, and app bootstrap
├── lib.rs             # Tauri application builder: window setup, plugins, tray, and command registration
├── commands.rs        # Tauri IPC command definitions (invoked from frontend)
├── nh_desktop.rs      # nhentai HTTP client, cookie handling, parsing, and data models
├── db.rs              # SQLite persistence layer: schema, queries, and connection pool
├── image_cache.rs     # Disk image caching, hashing, and LRU pruning engine
├── service.rs         # Background worker queue for downloads and maintenance
├── installer.rs       # Cross-platform installation and setup wizard routines
└── platform/          # Operating system specific integration helpers
    ├── windows.rs     # Windows shortcuts, registry keys, and WebView2 diagnostics
    ├── macos.rs       # macOS bundle helpers and permissions
    └── linux.rs       # Linux XDG desktop entry and MIME registrations
```

---

## Tauri Command Layer (`commands.rs`)

Commands in `commands.rs` serve as the bridge between frontend requests and backend services. Every command follows strict design requirements:

1. **Explicit Return Types**: All commands return `Result<T, AppError>`.
2. **State Injection**: Managed application states (`State<'_, AppState>`) provide shared access to the database, HTTP client, and download worker.
3. **Async Non-Blocking**: Long-running operations (such as HTTP requests and disk writes) are asynchronous to prevent blocking the Tauri main thread.

### Command Example
```rust
#[tauri::command]
pub async fn get_gallery(
    id: u32,
    state: State<'_, AppState>,
) -> Result<GalleryDetail, AppError> {
    state.nh_client.fetch_gallery(id).await
}
```

---

## HTTP Client & Networking (`nh_desktop.rs`)

The HTTP engine is built with `reqwest`:
- **Connection Reuse**: Employs an internal connection pool with HTTP/2 support.
- **Session Cookie Propagation**: Injects `sessionid` and `cf_clearance` into outgoing headers when configured.
- **Rate Limiting & Backoff**: Manages request pacing to prevent triggering automated rate-limiting protections on the host server.
- **Image URL Sanitization**: Validates that all fetched image URLs belong strictly to verified nhentai CDN domains (`i.nhentai.net`, `t.nhentai.net`).

---

## Background Worker Service (`service.rs`)

The `service.rs` module manages long-running asynchronous jobs:
- **Download Queue**: Processes batch gallery downloads one image at a time, emitting real-time progress events to the frontend (`download-progress`, `download-completed`).
- **Disk Space Management**: Periodically reviews disk cache consumption against user-defined quotas and executes LRU eviction.
