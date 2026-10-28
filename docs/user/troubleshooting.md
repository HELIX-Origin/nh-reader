# Troubleshooting & FAQ

This guide addresses common questions, networking errors, and troubleshooting steps for NH Reader.

---

## Frequently Asked Questions

### Why does a gallery fail to load or show a blank error card?
1. **Cloudflare Challenges / IP Rate Limiting**: The target site may occasionally present a Cloudflare verification challenge if too many rapid requests originate from your IP address.
   - Wait 1–2 minutes before refreshing.
   - If challenges persist, configure your `sessionid` and `cf_clearance` cookies in [Account & Session](./account-and-api-key.md).
2. **Network Filtering / ISP Blocking**: Some regional Internet Service Providers block access to adult image hosts.
   - Test accessing `nhentai.net` in your browser.
   - Configure a proxy or VPN under [Settings](./settings.md) > **Network**.

### Why did "Random Doujin" skip a gallery?
NH Reader verifies every randomly fetched gallery against your active [Global Blacklist](./blacklist.md). If the random item violates any rule, the app automatically re-rolls to find a title that matches your viewing preferences.

### Why does the reader show broken image icons?
1. **Temporary Image Server Downtime**: Occasionally individual image CDN nodes experience brief downtime. Click the image to trigger a retry.
2. **Full Disk Cache**: If your disk is out of free space, cached images cannot be saved. Check available storage space or purge the cache via **Settings** > **Cache**.

---

## Common Error Messages

| Error Message | Probable Cause | Recommended Resolution |
| :--- | :--- | :--- |
| `HTTP 403 Forbidden` | Cloudflare challenge or bot detection. | Refresh your session cookies in Settings or configure a proxy. |
| `HTTP 404 Not Found` | The gallery ID was removed or unpublished from the site. | Return to Browse or search for an alternative release. |
| `HTTP 429 Too Many Requests` | Too many queries sent in a short window. | Pause downloads or allow 60 seconds before making new searches. |
| `Database Locked` | Another instance of NH Reader is currently running. | Close any background running instances via Task Manager / Activity Monitor. |

---

## Windows WebView2 Issues

If NH Reader opens to a blank white screen on Windows:
1. Ensure the **Microsoft Edge WebView2 Runtime** is installed.
2. Download and run the official installer from Microsoft's WebView2 page:
   `https://developer.microsoft.com/en-us/microsoft-edge/webview2/`
3. Restart NH Reader.

---

## Resetting App Configuration

If the application fails to start or encounters an unrecoverable database state:
1. Close NH Reader completely.
2. Navigate to your platform configuration directory:
   - **Windows**: `%LOCALAPPDATA%\club.helix-origin.nh-reader`
   - **macOS**: `~/Library/Application Support/club.helix-origin.nh-reader`
   - **Linux**: `~/.local/share/club.helix-origin.nh-reader`
3. Rename or delete `data.db`.
4. Relaunch NH Reader to initialize a fresh, clean database.

---

## Getting Further Help

If your issue is not resolved by the steps above:
- Search existing discussions in the [GitHub Discussions](https://github.com/HELIX-Origin/nh-reader/discussions).
- File a detailed bug report using our [GitHub Issues](https://github.com/HELIX-Origin/nh-reader/issues) template, attaching diagnostic logs from **Settings** > **About**.
