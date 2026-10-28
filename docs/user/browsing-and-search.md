# Browsing & Search

NH Reader allows you to explore the vast catalog of nhentai.net with responsive filtering, intuitive sorting, and rapid keyboard navigation.

---

## Browse Catalog

The primary browsing experience lives under the **Browse** tab.

### Sorting Modes
The catalog can be sorted using the dropdown selector in the top toolbar:

1. **Newest**: Chronological feed of the most recently published works across the catalog.
2. **Popular (All Time)**: The all-time most bookmarked and popular titles.
3. **Popular This Week**: Trending titles bookmarked or viewed most frequently over the past 7 days.
4. **Popular Today**: Fast-moving releases popular over the past 24 hours.

When a sort mode is chosen, the URL updates (e.g. `/?sort=popular-week`), allowing you to bookmark or preserve your preferred sort view across app sessions.

### Random Doujinshi
Click the **Random Doujin** button (dice icon) in the Browse toolbar to jump directly to a randomly selected work:
- The backend queries the site for a valid random ID.
- The random selection is verified against your [Global Blacklist](./blacklist.md); if the selected work contains blacklisted tags, the client re-rolls automatically up to 5 times to present a safe selection.

---

## Search Capabilities

Use the global search input located in the custom top bar from anywhere in the app.

### Keyboard Shortcuts
- Press `Enter` inside the search bar to execute the search immediately.
- Press `Escape` while focused in the search bar to clear your query.

### Search Operators & Query Syntax
NH Reader leverages nhentai's search engine directly. You can combine tags, artists, languages, and negative exclusions:

- **Plain Text**: `cat girl maid` searches for titles containing those terms.
- **Specific Tag**: `tag:"big breasts"` searches for exact tag matches.
- **Artist**: `artist:"shindo l"` filters specifically by the illustrator.
- **Character**: `character:"asuka langley soryu"` restricts results to specific characters.
- **Parody / Series**: `parody:"neon genesis evangelion"` limits results to specific franchises.
- **Language**: `language:english`, `language:japanese`, `language:chinese`.
- **Negative Exclusions**: `-tag:"scat"` or `-language:japanese` will explicitly exclude works matching those criteria from search results.
- **Exact Quotes**: Wrap multi-word phrases in double quotes (`"..."`).

---

## Gallery Details Page

Clicking on any cover card opens the gallery details view:
- **Title and Metadata**: Japanese and English titles, upload timestamp, page count, and language.
- **Tag Cloud**: Grouped badges for Parodies, Characters, Tags, Artists, Groups, and Languages. Clicking any tag badge initiates a new search for that specific tag.
- **Action Buttons**:
  - **Read Now**: Opens the integrated reading view starting from page 1.
  - **Favorite**: Toggles saving this gallery to your local Favorites list (and remote account if connected).
  - **Download**: Enqueues all gallery pages for background offline download.
  - **Back / Up**: Seamlessly returns to the previous gallery list view while preserving scroll position and pagination.
- **Thumbnail Grid**: Displays high-density thumbnails of all pages in the book. Clicking any thumbnail opens the reader directly at that specific page number.
