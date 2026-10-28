# Settings & Customization

The **Settings** view in NH Reader allows you to tailor the interface, reader behavior, network configuration, and storage preferences to your exact needs.

---

## Appearance & Interface

- **Theme Mode**:
  - `Dark`: Low-glare dark palette optimized for reading in low-light environments.
  - `Light`: High-contrast light palette.
  - `System Default`: Automatically matches your operating system's theme preference.
- **Interface Density**:
  - `Comfortable`: Larger cards, generous spacing, and prominent metadata badges.
  - `Compact`: Higher information density with tighter grid margins to view more covers simultaneously.
- **Language / Locale**:
  - Choose between 17+ community-translated languages (English, Japanese, Spanish, French, German, Chinese, etc.).
  - Default: System language detection with automatic fallback to English.

---

## Reader Defaults

- **Default Reading Mode**: Choose the initial layout when opening a gallery (`Single Page`, `Double Page Spread`, or `Continuous Scroll`).
- **Reading Direction**: Default to `Right-to-Left (RTL)` for authentic manga reading, or `Left-to-Right (LTR)`.
- **Default Fit Mode**: Select between `Fit Width`, `Fit Height`, `Fit Both`, or `100% Original Size`.
- **Preload Distance**: Configure how many forward pages the image cache pre-fetches in advance (default: 3 pages). Increasing this provides smoother reading on fast connections; decreasing saves memory on low-RAM systems.

---

## Cache & Storage Management

- **Disk Cache Size**: Displays current space consumed by cached cover images and reader pages.
- **Max Cache Quota**: Set a maximum threshold (e.g. 1 GB, 2 GB, 5 GB). Older images are pruned automatically using an LRU (Least Recently Used) policy.
- **Clear Cache Now**: One-click button to purge all cached image files from disk immediately.

---

## Downloads

- **Download Location**: Set the default filesystem directory for downloaded galleries.
- **Folder Naming Format**: Choose how folders are named upon saving (e.g. `[{id}] {title}` or `{title} - {artist}`).
- **Concurrent Connections**: Adjust download concurrency (default: 1 sequential thread to prevent server throttling).

---

## Network & Proxy

- **Custom User Agent**: Override the HTTP user-agent string if required for network compatibility.
- **Proxy Support**: Configure an HTTP or SOCKS5 proxy (`http://127.0.0.1:1080`) to route all requests through a VPN or secure tunnel.
- **Connection Timeout**: Adjust HTTP request timeout duration (default: 30 seconds).

---

## About & Diagnostics

- **App Version**: Current build version, Git commit hash, and build timestamp.
- **Platform Info**: OS version, WebView2 runtime version, and Rust compiler version.
- **Export Diagnostic Logs**: Generate a sanitized log file for troubleshooting support.
