# explore TMDb

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

A simple web app allowing users to search on The Movie Database (TMDb) by using the api.

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate) version 2.0.1.

## Prerequisites

### Angular CLI

* `angular-cli 10.1.4` or higher

### Apache and php

* `Apache 2.4` or higher
* `php 7.3` or higher

### Node, npm or yarn

* `node 12.16.1` or higher in combination with
  * `npm 6.13.4` or higher or
  * `yarn 1.22.5` or higher, used in this repository

## Dependency check

Some libraries could not be updated b/c of peer dependencies or knowing issues.

| library    | current version | wanted version | reason |
| ---------- | --------------- | -------------- | ------ |
| zone.js | 0.10.3 | 0.11.1 | "@angular/core@10.1.4" has incorrect peer dependency "zone.js@~0.10.3" |
| copy-webpack-plugin | 4.6.0 | 6.2.0 | "copy-webpack-plugin@6.2.0" has unmet peer dependency "webpack@^4.0.0 || ^5.0.0" |

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/explore-tmdb
cd explore-tmdb
```

## Usage

### Modules

For the client check [explore-tmdb - client](./client).

For the server check [explore-tmdb - server](./server).
