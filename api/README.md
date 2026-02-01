# explore TMDb - api

## Getting started

```bash
# all commands used in ./api
cd api
```

Create config files for `development mode` and `production mode`.

```bash
cp config/config.default.php config/config.dev.php
cp config/config.default.php config/config.prod.php
```

**Note**: This file will not be under version control but listed in .gitignore.

## Configuration

### Table of contents

* [API_KEY](#api_key)
* [CUSTOM_API_KEY](#custom_api_key)
* [DB_PATH](#db_path)

### `API_KEY`

Defines the api key for tmdb.

* default: EMPTY
* type: `string`

### `CUSTOM_API_KEY`

Defines the API key for authenticating custom item additions. Only requests with a valid API key can add new entries.

* default: EMPTY
* type: `string`
* usage: Include in request headers as `Authorization: Bearer YOUR_KEY` or `X-API-Key: YOUR_KEY`

### `DB_PATH`

Defines the path to the SQLite database for custom items.

* default: `../database/custom_items.db`
* type: `string`

## Database Setup

Before using the custom items feature, initialize the database:

```bash
# Initialize the database (creates tables if they don't exist)
# The database will be automatically created when you first access the item endpoint
# Or manually create it:
sqlite3 database/custom_items.db < database/setup.sql
```

## API Endpoints

### GET /api/rest/list

Fetches items from TMDb API.

**Parameters:**
* `listId` - The TMDb list ID
* `language` - Language code (e.g., 'de', 'en')

### GET /api/rest/item

Get all custom items from the database.

**Response:**
```json
{
  "items": [
    {
      "id": 1,
      "title": "Movie Title",
      "comment": "My comment",
      "media_type": "movie",
      "created_at": "2026-02-01 12:00:00",
      "created_by": "inpercima"
    }
  ]
}
```

### POST /api/rest/item

Add a new custom item to the database. **Requires authentication.**

**Headers:**
* `Content-Type: application/json`
* `Authorization: Bearer YOUR_CUSTOM_API_KEY` or `X-API-Key: YOUR_CUSTOM_API_KEY`

**Body:**
```json
{
  "title": "Movie Title",
  "comment": "My comment about the movie",
  "media_type": "movie"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "id": 1,
  "title": "Movie Title",
  "comment": "My comment",
  "media_type": "movie",
  "created_by": "inpercima"
}
```

**Error Responses:**
* `401 Unauthorized` - Invalid or missing API key
* `400 Bad Request` - Invalid input data
* `405 Method Not Allowed` - Invalid HTTP method
