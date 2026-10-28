# Downloads & Offline Viewing

NH Reader features a built-in background download manager that lets you save complete galleries to your local storage for offline reading without an active internet connection.

---

## Starting a Download

1. Open any gallery details page.
2. Click the **Download** button in the actions row.
3. The gallery is immediately queued in the background download service.
4. An active download badge appears in the bottom navigation dock showing remaining items.

---

## Download Manager View

Navigate to the **Downloads** tab to inspect and manage your downloads. The view is split into two sections:

### 1. Active Queue
- **Progress Tracking**: Shows overall completion percentage, current page being fetched, and download speed.
- **Pause & Resume**: Temporarily suspend downloads if bandwidth is constrained elsewhere.
- **Cancel**: Abort the download and discard partially saved files.
- **Retry Mechanism**: If a page fails to download due to a network glitch or timeout, the queue worker automatically retries up to 3 times before flagging the job.

### 2. Completed Downloads
- Displays a catalog grid of all downloaded titles stored on disk.
- Offline titles feature a checkmark badge and can be read completely offline without fetching network images.
- Includes a **Delete Download** option to free up disk space when finished.

---

## Storage Structure

Downloaded galleries are stored in standard image formats (JPEG/PNG/WebP) within your designated download directory:

```
Downloads/NH-Reader/
└── [123456] Gallery Title Here/
    ├── cover.jpg
    ├── 001.jpg
    ├── 002.jpg
    ├── 003.jpg
    └── metadata.json
```

- Each downloaded folder includes a `metadata.json` file containing title, tags, artists, and original upload information for interoperability with external comic readers (such as Tachiyomi, YACReader, or Komga).
- The storage destination can be customized under [Settings](./settings.md) > **Downloads** > **Destination Path**.

---

## Performance & Rate Limiting

To maintain good standing with the host servers and prevent Cloudflare IP rate limiting:
- Downloads are executed sequentially with a brief inter-page delay.
- The downloader automatically respects HTTP `429 (Too Many Requests)` responses by applying exponential backoff before continuing.
