# explore TMDb

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

A simple web app allowing users to search on The Movie Database (TMDb) by using the api.

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate) version 2.0.0-SNAPSHOT.

## Prerequisites

### Angular CLI

* `angular-cli 9.1.6` or higher

### Docker

* `docker 19.03.5` or higher
* `docker-compose 1.25.0` or higher

### Node, npm or yarn

* `node 12.16.1` or higher in combination with
  * `npm 6.13.4` or higher or
  * `yarn 1.22.4` or higher, used in this repository

## Dependency check

Some libraries could not be updated b/c of peer dependencies or knowing issues.

| library    | current version | wanted version | reason |
| ---------- | --------------- | -------------- | ------ |
| copy-webpack-plugin | 4.6.0 | 5.1.1 | "copy-webpack-plugin@5.1.1" has unmet peer dependency "webpack@^4.0.0" |

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/explore-tmdb
cd explore-tmdb
```

## Usage

### Modules

For the client check [explore-tmdb - client](./client).

For the api check [explore-tmdb - api](./api).

For the docker check [explore-tmdb - docker](./README_docker.md).
