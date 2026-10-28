# Data & Storage

NH Reader uses an embedded **SQLite** database (`rusqlite`) for all structured data persistence, combined with a dedicated filesystem directory for caching and media downloads.

---

## Storage Locations

All user data and caches are stored inside platform-standard application directories:

| Component | Windows | macOS | Linux |
| :--- | :--- | :--- | :--- |
| **Database** | `%LOCALAPPDATA%\club.helix-origin.nh-reader\data.db` | `~/Library/Application Support/club.helix-origin.nh-reader/data.db` | `~/.local/share/club.helix-origin.nh-reader/data.db` |
| **Image Cache** | `%LOCALAPPDATA%\club.helix-origin.nh-reader\cache\` | `~/Library/Caches/club.helix-origin.nh-reader/` | `~/.cache/club.helix-origin.nh-reader/` |
| **Downloads** | `~/Downloads/NH-Reader/` (Configurable) | `~/Downloads/NH-Reader/` | `~/Downloads/NH-Reader/` |

---

## SQLite Database Architecture (`db.rs`)

Database access is encapsulated behind an `Arc<Mutex<Connection>>` managed state. To prevent thread deadlock or unhandled panic lock poisoning, the connection implements poisoned mutex recovery:

```rust
pub fn lock_conn(&self) -> MutexGuard<'_, Connection> {
    match self.conn.lock() {
        Ok(guard) => guard,
        Err(poisoned) => {
            eprintln!("[WARN] Recovered poisoned database lock");
            poisoned.into_inner()
        }
    }
}
```

---

## Database Schema & Tables

The schema is initialized automatically on app launch using idempotent migrations:

```sql
-- Application settings and persistent preferences
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Saved favorites (local and synced)
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY,
    media_id TEXT NOT NULL,
    title_english TEXT,
    title_japanese TEXT,
    cover_type TEXT NOT NULL,
    cover_width INTEGER,
    cover_height INTEGER,
    num_pages INTEGER NOT NULL,
    created_at INTEGER NOT NULL
);

-- Chronological reading history
CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY,
    media_id TEXT NOT NULL,
    title_english TEXT,
    title_japanese TEXT,
    cover_type TEXT NOT NULL,
    current_page INTEGER DEFAULT 1,
    num_pages INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

-- Client-side global blacklist rules
CREATE TABLE IF NOT EXISTS blacklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_type TEXT NOT NULL,      -- 'tag', 'artist', 'character', 'parody', 'group', 'language'
    tag_name TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    UNIQUE(tag_type, tag_name)
);

-- Download manager jobs and status
CREATE TABLE IF NOT EXISTS downloads (
    id INTEGER PRIMARY KEY,
    media_id TEXT NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL,        -- 'queued', 'downloading', 'completed', 'paused', 'failed'
    current_page INTEGER DEFAULT 0,
    total_pages INTEGER NOT NULL,
    destination_path TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

---

## Image Cache Engine (`image_cache.rs`)

The image cache stores downloaded covers and viewed reader pages locally to accelerate repeat visits and reduce network usage:

1. **Hash-Based Filenames**: Each cached file is named after the SHA-256 hash of its origin URL.
2. **Access Timestamps**: File modification times are touched whenever an image is read.
3. **LRU Eviction**: When total cache size exceeds the configured quota (e.g. 2 GB), an asynchronous background task orders cached files by last-accessed timestamp and removes the oldest files until the cache size drops below 80% of the threshold.
