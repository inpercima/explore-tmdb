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

* [API_KEY](#apikey)

### `API_KEY`

Defines the api key for tmdb.

* default: EMPTY
* type: `string`
