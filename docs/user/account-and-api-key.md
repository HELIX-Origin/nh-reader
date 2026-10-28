# Account & Session Configuration

NH Reader does not require an account to browse, search, blacklist, read, or download manga. However, if you wish to synchronize your existing website favorites or access age-restricted features directly on nhentai.net, you can link your session.

---

## Why Connect Your Account?

- **Two-Way Favorite Sync**: Automatically import your website favorites into the desktop app and synchronize new bookmarks back to your web profile.
- **Bypass Website Blocks**: If nhentai requires authentication for specific queries, an authenticated session ensures uninterrupted access.

---

## Session Cookie Setup

nhentai.net uses session cookies (`sessionid` and `cf_clearance`) rather than traditional username/password authentication or public OAuth:

### Step 1: Obtain Your Cookies
1. Open your web browser (Chrome, Firefox, Edge, or Brave) and navigate to `https://nhentai.net`.
2. Log into your account normally.
3. Open Developer Tools by pressing `F12` (or `Ctrl + Shift + I` / `Cmd + Option + I`).
4. Select the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox).
5. In the left panel, expand **Cookies** and select `https://nhentai.net`.
6. Locate the following cookie values:
   - `sessionid`: A long alphanumeric string representing your authenticated user session.
   - `cf_clearance` (Optional but recommended): Cloudflare verification token.
   - `csrftoken`: Cross-site request forgery token.

### Step 2: Configure in NH Reader
1. Open NH Reader and go to **Settings** > **Account & Session**.
2. Click **Connect Account**.
3. Paste your `sessionid` and `cf_clearance` into the respective fields.
4. Click **Verify & Save**.
5. NH Reader tests the connection by fetching your user profile. Once verified, your username and favorite count will be displayed in the Account header.

---

## Security & Storage

- **Local Storage Only**: Your session tokens are stored exclusively in your local SQLite database with operating-system-level file permissions.
- **Zero Third-Party Transmission**: Cookies are attached strictly to requests sent directly to official `nhentai.net` domains (`nhentai.net`, `i.nhentai.net`, `t.nhentai.net`). They are never transmitted to any external server, proxy, or analytics service.
- **Revocation**: You can disconnect your account at any time by clicking **Sign Out / Disconnect** in Settings. This instantly deletes the tokens from your local database.
