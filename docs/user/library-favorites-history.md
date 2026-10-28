# Library, Favorites & History

NH Reader provides comprehensive tools to organize your reading collection, preserve bookmarks, and track your history locally and securely.

---

## Favorites

The **Favorites** view (accessible via the heart icon in the main navigation) organizes all galleries you have bookmarked.

### Adding & Removing Favorites
- On any gallery details page, click the **Favorite** button to add the work to your favorites.
- The button state toggles to reflect its active status.
- Clicking it again removes the work from your favorites list.

### Local vs. Remote Favorites
- **Offline / Local Mode**: If you do not have an nhentai account configured, all favorites are stored exclusively inside your local SQLite database.
- **Account Synchronization**: If you configure your session credentials in [Account & Session](./account-and-api-key.md), NH Reader will fetch and synchronize your remote favorites from the site, keeping your desktop collection aligned with your web profile.

### Sorting Favorites
Within the Favorites view, you can sort your saved works:
- **Date Added (Recent First / Oldest First)**
- **Title (Alphabetical)**
- **Page Count**

---

## History

The **History** tab maintains an automatic chronological log of every gallery you open and read.

### History Features
- **Reading Progress**: Remembers the exact page number where you left off. Opening a previously read gallery allows you to resume reading instantly.
- **Timestamp Tracking**: Records the exact date and time a gallery was last accessed.
- **History Filtering**: Use the inline filter input to quickly search through titles within your reading history.

### Clearing History
- **Remove Single Item**: Hover over an entry in the History view and click the trash icon.
- **Clear Entire History**: Click the **Clear All History** button in the History header or go to [Settings](./settings.md) > **Privacy** to wipe all historical records.

---

## Data Portability

All favorites and reading history are stored in a standard SQLite database on your local machine:
- **Windows**: `%LOCALAPPDATA%\club.helix-origin.nh-reader\data.db`
- **macOS**: `~/Library/Application Support/club.helix-origin.nh-reader/data.db`
- **Linux**: `~/.local/share/club.helix-origin.nh-reader/data.db`

You can back up, restore, or transfer this file between computers at any time.
