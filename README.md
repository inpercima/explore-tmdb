# explore TMDb

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

A simple web app allowing users to search on The Movie Database (TMDb) by using the api.
For demonstration, I use my own lists by default.

This app is online under [explore-tmdb.inpercima.net](http://explore-tmdb.inpercima.net).

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate) version 2.5.3.

## Prerequisites

### Angular CLI

* `@angular/cli 20.3.5` or higher

### Apache and php

Is required if started locally and not with Docker.

* `Apache 2.4` or higher
* `php 8.2` or higher

### Docker

* `docker 27.5.1` or higher

### Node, npm or pnpm

* `node 22.20.0` or higher in combination with
  * `npm 10.9.3` or higher or
  * `pnpm 10.18.2` or higher, used in this repository

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/explore-tmdb/
cd explore-tmdb
```

## Usage

### Quick Setup

1. **Backend Configuration**
   
   Create environment-specific configuration files:
   ```bash
   cd api
   cp config/config.default.php config/config.dev.php
   cp config/config.default.php config/config.prod.php
   ```
   
   Update the configuration files with your API keys:
   - `API_KEY`: Your TMDb API v4 key
   - `CUSTOM_API_KEY`: A secure key for custom item authentication (only user "inpercima" should have this)
   - `DB_PATH`: Path to SQLite database (default: `../database/custom_items.db`)

2. **Frontend Configuration**
   
   Create environment-specific configuration files:
   ```bash
   cd frontend/src/environments
   cp environment.ts environment.dev.ts
   # Update environment.prod.ts if needed (template already exists)
   ```
   
   Update `customApiKey` in your environment files to match the backend `CUSTOM_API_KEY`.

3. **Database Setup**
   
   The database will be created automatically when you first use the custom items endpoint.
   Alternatively, you can manually initialize it:
   ```bash
   cd api
   sqlite3 database/custom_items.db < database/setup.sql
   ```

### Modules

For the frontend check [explore-tmdb - frontend](./frontend).

For the backend check [explore-tmdb - api](./api).

For the docker check [explore-tmdb - docker](./README_docker.md).

### Custom Items Feature

The application now supports adding custom movie/TV items through an authenticated API:

- **Adding Items**: Use the "Add Custom Item" form in the dashboard
- **Authentication**: Requires a valid API key (configured in environment files)
- **Supported Media Types**: Movie or TV Show
- **Storage**: Items are stored in a local SQLite database

Only authenticated users (with the correct API key) can add new entries. This ensures that only the repository owner (inpercima) can modify the custom items list.
