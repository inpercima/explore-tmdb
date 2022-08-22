# explore TMDb - docker

## Getting started

This docker version is used to run the backend in container if apache and php are not installed locally.

Check for the existence of `config.dev.php` as described in [explore-tmdb - api](./api).

## Usage

```bash
# build the image and container
docker-compose build

# run the container
docker-compose up -d

# run the container and rebuild
docker-compose up -d --build

# stop the container
docker-compose down
```
