# Global Blacklist

NH Reader includes an enforceable client-side **Global Blacklist** engine. Unlike basic website filters that may leak unwanted content through search results or random selections, NH Reader filters every incoming gallery payload through your local rules before it is rendered on screen.

---

## How It Works

1. **Client-Side Interception**: When search, browse, or random API results are received by the Rust backend, each gallery's tag array is inspected.
2. **Deterministic Matching**: Any gallery matching at least one active blacklist rule is either hidden entirely or blurred (depending on your display preference).
3. **Random Discovery Protection**: When using the "Random Doujin" feature, any hit that matches your blacklist is automatically discarded and a new random ID is fetched.

---

## Managing Blacklist Rules

Navigate to the **Blacklist** tab from the main navigation:

### Adding Rules
1. Enter the keyword or tag name into the **Add tag to blacklist** input field.
2. Select the rule category (Tag, Artist, Character, Parody, or Group).
3. Click **Add** or press `Enter`.

### Rule Types
- **Exact Tag Match**: Excludes works carrying the exact specified tag (e.g. `guro`, `scat`, `snuff`, `netorare`).
- **Artist Exclusion**: Excludes any work illustrated by the specified artist.
- **Character Exclusion**: Hides doujinshi featuring specific characters.
- **Language Exclusion**: Hides releases in languages you do not read.

### Removing Rules
In the Blacklist tab, locate the rule in the active tags list and click the **Remove (X)** button. The change takes effect immediately across all views.

---

## Behavior Modes

In [Settings](./settings.md), you can customize how blacklisted galleries behave when encountered:
- **Hide Completely (Default)**: Blacklisted cards are omitted from gallery grids, maintaining a clean browsing feed.
- **Blur & Warn**: The cover card is rendered with an opaque blur filter and an alert badge indicating which blacklisted tag was triggered. Clicking the card allows you to reveal it temporarily.
