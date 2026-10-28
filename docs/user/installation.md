# Installation & Setup

NH Reader provides official binary packages for Windows, macOS, and Linux.

---

## Windows Installation

### Option 1: Modern NSIS Setup Installer (Recommended)
1. Download `nh-reader-<version>-x64-setup.exe` from the [Releases](https://github.com/HELIX-Origin/nh-reader/releases) page.
2. Run the executable. If Windows SmartScreen displays a warning, click **More info** and select **Run anyway**.
3. Follow the custom setup wizard:
   - Select installation destination directory (default: `%LOCALAPPDATA%\Programs\NH Reader`).
   - Choose whether to create Desktop and Start Menu shortcuts.
   - Choose whether to add the CLI executable to your user `PATH`.
4. Click **Install**. Once finished, the installer will launch NH Reader automatically.

### Option 2: MSI Package
- Download `nh-reader_<version>_x64_en-US.msi` for enterprise or silent enterprise installations:
  ```powershell
  msiexec /i nh-reader_<version>_x64_en-US.msi /quiet
  ```

### WebView2 Requirement
On Windows 10/11, NH Reader requires Microsoft Edge WebView2. Most Windows 11 systems and updated Windows 10 machines have this pre-installed. If missing, the installer will prompt to download the Evergreen WebView2 Bootstrapper from Microsoft.

---

## macOS Installation

1. Download the Universal DMG package `nh-reader_<version>_universal.dmg`.
2. Open the disk image file.
3. Drag **NH Reader** into your `/Applications` folder.
4. Eject the DMG.
5. On initial launch, if Gatekeeper reports that the application is from an unidentified developer:
   - Open **System Settings** > **Privacy & Security**.
   - Scroll down to the **Security** section and click **Open Anyway** next to the NH Reader notification.

---

## Linux Installation

### Option 1: AppImage (Portable / Universal)
1. Download `nh-reader_<version>_amd64.AppImage`.
2. Make the file executable:
   ```bash
   chmod +x nh-reader_<version>_amd64.AppImage
   ```
3. Run the AppImage:
   ```bash
   ./nh-reader_<version>_amd64.AppImage
   ```

### Option 2: Debian / Ubuntu Package (`.deb`)
1. Download `nh-reader_<version>_amd64.deb`.
2. Install via APT or dpkg:
   ```bash
   sudo apt install ./nh-reader_<version>_amd64.deb
   ```
3. The package installs system dependencies, desktop entry shortcuts, and application icons.

### Linux Runtime Dependencies
Ensure your Linux distribution has WebKit2GTK 4.1 installed:
- **Ubuntu / Debian**: `sudo apt install libwebkit2gtk-4.1-0 libappindicator3-1 librsvg2-common`
- **Arch Linux**: `sudo pacman -S webkit2gtk-4.1 libappindicator-gtk3 librsvg`
- **Fedora**: `sudo dnf install webkit2gtk4.1 libappindicator-gtk3 librsvg2`

---

## Uninstallation

- **Windows**: Navigate to **Settings** > **Apps** > **Installed Apps**, locate **NH Reader**, and click **Uninstall**. You can optionally choose to preserve or purge your local SQLite database and image cache.
- **macOS**: Drag `NH Reader.app` from `/Applications` to the Trash. To purge saved data, remove `~/Library/Application Support/club.helix-origin.nh-reader`.
- **Linux**: For `.deb`, run `sudo apt remove nh-reader`. For AppImage, simply delete the `.AppImage` file and clean `~/.local/share/club.helix-origin.nh-reader` if desired.
