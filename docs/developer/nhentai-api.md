# nhentai API & Scraping

This document outlines the API endpoints, data models, and network conventions used by NH Reader to interface with nhentai.net.

---

## Base URLs

- **Primary Web Interface**: `https://nhentai.net`
- **JSON API Base**: `https://nhentai.net/api`
- **Full Resolution Images CDN**: `https://i.nhentai.net`
- **Thumbnails & Covers CDN**: `https://t.nhentai.net`

---

## API Endpoints

### 1. Gallery Details
Retrieves complete metadata, page array, and tag definitions for a specific gallery ID.

- **Endpoint**: `GET /api/gallery/{gallery_id}`
- **Parameters**: `gallery_id` (u32 integer)
- **Response Shape**:
  ```json
  {
    "id": 123456,
    "media_id": "987654",
    "title": {
      "english": "Example Manga Title [English]",
      "japanese": "サンプル 漫画 タイトル",
      "pretty": "Example Manga Title"
    },
    "images": {
      "pages": [
        { "t": "j", "w": 1280, "h": 1800 },
        { "t": "p", "w": 1280, "h": 1800 }
      ],
      "cover": { "t": "j", "w": 350, "h": 492 },
      "thumbnail": { "t": "j", "w": 250, "h": 351 }
    },
    "scanlator": "",
    "upload_date": 1600000000,
    "tags": [
      { "id": 1234, "type": "tag", "name": "big breasts", "url": "/tag/big-breasts/", "count": 50000 },
      { "id": 5678, "type": "artist", "name": "artist name", "url": "/artist/artist-name/", "count": 25 }
    ],
    "num_pages": 24,
    "num_favorites": 1500
  }
  ```

### 2. Search & Filter
Executes search queries with optional pagination and sorting.

- **Endpoint**: `GET /api/galleries/search`
- **Query Parameters**:
  - `query` (string): Search query string with tags and exclusions (e.g. `language:english -tag:scat`).
  - `page` (integer): Page number (1-indexed).
  - `sort` (string, optional): `popular`, `popular-week`, `popular-today`. Defaults to newest.
- **Response Shape**:
  ```json
  {
    "result": [ ...array of gallery objects... ],
    "num_pages": 50,
    "per_page": 25
  }
  ```

### 3. All Galleries (Browse Stream)
Returns the chronological list of newest uploads.

- **Endpoint**: `GET /api/galleries/all`
- **Query Parameters**:
  - `page` (integer): Page number.

### 4. Random Gallery Discovery
Fetches a random gallery using the site's redirect handler.

- **Endpoint**: `GET /random/`
- **Behavior**: The HTTP client inspects the HTTP 302 redirect response header `Location` to extract the destination gallery ID (e.g. `/g/456789/` -> `456789`).

---

## Image Extension Mapping

The image format field (`t`) in the gallery JSON payload maps to standard image file extensions:

| Code (`t`) | Extension | MIME Type |
| :--- | :--- | :--- |
| `"j"` | `.jpg` | `image/jpeg` |
| `"p"` | `.png` | `image/png` |
| `"w"` | `.webp` | `image/webp` |
| `"g"` | `.gif` | `image/gif` |

### Image URL Construction
- **Cover Image**: `https://t.nhentai.net/galleries/{media_id}/cover.{ext}`
- **Thumbnail Image**: `https://t.nhentai.net/galleries/{media_id}/thumb.{ext}`
- **Page Image**: `https://i.nhentai.net/galleries/{media_id}/{page_number}.{ext}`
