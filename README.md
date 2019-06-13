# explore-tmdb

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

A simple web app allowing users to search on The Movie Database (TMDb) by using the api.

A demo version is online under [explore-tmdb.inpercima.net](http://explore-tmdb.inpercima.net).

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate) version 0.4.0.

## Prerequisites

### Angular CLI

* `angular-cli 8.0.3` or higher

### Apache and php

* `Apache 2.4` or higher
* `php 7.3` or higher

### Node, npm or yarn

* `node 12.3.1` or higher in combination with
  * `npm 6.9.0` or higher or
  * `yarn 1.16.0` or higher, used in this repository

## Dependency check

Some libraries could not be updated b/c of peer dependencies or knowing issues.

| library    | version | reason |
| ---------- | ------- | ------ |
| typescript | 3.4.3   | @angular-devkit/build-angular > @ngtools/webpack@8.0.2" has incorrect peer dependency "typescript@>=3.4 < 3.5 |
| copy-webpack-plugin | 4.6.0 | copy-webpack-plugin@5.0.3" has unmet peer dependency "webpack@^4.0.0" |

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/explore-tmdb
cd explore-tmdb
```

## Usage

For the client check [explore-tmdb - client](https://github.com/inpercima/explore-tmdb/tree/master/client).

For the api check [explore-tmdb - api](https://github.com/inpercima/explore-tmdb/tree/master/api).
