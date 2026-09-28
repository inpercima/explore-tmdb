# explore TMDb

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
[![Node CI](https://github.com/inpercima/explore-tmdb/actions/workflows/node_ci.yml/badge.svg)](https://github.com/inpercima/explore-tmdb/actions/workflows/node_ci.yml)

A simple web app allowing users to search on The Movie Database (TMDb) by using the api.

For demonstration, I use my own lists by default.

This app is available at [explore-tmdb.inpercima.net](https://explore-tmdb.inpercima.net).

## Prerequisites

### Node, npm or pnpm

* `node 24.16.0` or higher in combination with
  * `npm 11.13.0` or higher or
  * `pnpm 11.24.0` or higher, used in this repository

Install pnpm by running:

```bash
npm install -g pnpm@11.24.0
```

### Info for npm and pnpm

This repo uses `pnpm` as package manager.
You can also use `npm` for your local work but changes will be made by `pnpm` only.

### Angular CLI

* `@angular/cli 22.2.0` or higher

Install @angular/cli by running:

```bash
pnpm install -g @angular/cli@212
```

### Apache and php

Is required if started locally and not with Docker.

* `Apache 2.4` or higher
* `php 8.2` or higher

### Docker

* `docker 27.5.1` or higher

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/explore-tmdb/

# navigate to the project
cd explore-tmdb

# install tools and frontend dependencies
pnpm install

# create environment files for `development mode`.
cp src/environments/environment.ts src/environments/environment.dev.ts
```

**Note**: This file will not be under version control (listed in .gitignore).

## Development Mode

### Setup for development

Edit `src/environments/environment.dev.ts` to match your local setup:

* Set `production: false`
* Configure `api` URL (default: `./api/`)
* Adjust other settings as needed (see [Configuration](#configuration) section)

### Running in development mode

```bash
pnpm start
```

The application will be available at [http://localhost:4200/](http://localhost:4200/) and automatically reload when you make changes to the source code.

### Building for development

```bash
pnpm build:dev
```

This runs `ng lint` followed by `ng build --configuration=development`, creating a development build in the `dist/` directory.

## Production Mode

### Setup for production

Edit `src/environments/environment.prod.ts`:

* Set `production: true`
* Configure production `api` URL
* Set appropriate theme and other production-specific settings

### Building for production

```bash
pnpm build:prod
```

This runs `ng lint` followed by `ng build` (production configuration), creating an optimized bundle in `dist/`.

### Deployment

After a push to the main branch the app will be deployed by the github actions using sftp server.

## Testing and linting

```bash
# run unit tests
ng test

# run end-to-end tests
ng e2e

# lint files
ng lint
```

## Configuration

### General

All options have to been set in the environment files but some of them do not need to be changed.
All defaults refer to the environment file (`environment.ts`), they are prepared in `development mode` (`environment.dev.ts`).
Change for `production mode` the option `production` to `true`.

### Table of contents

* [api](#api)
* [appname](#appname)
* [production](#production)
* [theme](#theme)

### `api`

Defines the URL to the backend.

* default: `./`
* type: `string`

### `appname`

Applicationwide title of the app, displayed in title and toolbar.

* default: `explore TMDb`
* type: `string`

### `production`

Defines whether the app is in production or not.

* default: `false`
* type: `boolean`
* values: `true`/`false`

### `theme`

Name of a pre-build-theme or a custom theme.

* default: `rose-red`
* type: `string`
* values: `rose-red`/`azure-blue`/`magenta-violet`/`cyan-orange`/`custom`

To modify the custom theme just edit the colors and themes in `themes.scss`.
