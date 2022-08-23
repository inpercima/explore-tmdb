# explore TMDb - docker

## Getting started

This docker version is used to run the backend in container if apache and php are not installed locally.

Create environment file for `docker` and `docker compose` and check the [configuration](#configuration).

```bash
cp default.env .env
```

**Note**: This file will not be under version control but listed in .gitignore.

Check for the existence of `config.dev.php` and `config.prod.php` as described in [explore-tmdb - api](./api).

## Usage

```bash
# build the image and container
docker compose build

# run the container
docker compose up -d

# run the container and rebuild
docker compose up -d --build

# stop the container
docker compose down
```

## Configuration

### Table of contents

* [MODE](#MODE)

### `MODE`

Defines the mode in which the backend should be started.
Valid values are `dev` and `prod`.

* default: `dev`
* type: `string`
