# explore-tmdb

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

A simple web app allowing users to search on The Movie Database (TMDb) by using the api.

A demo version is online under [explore-tmdb.inpercima.net](http://explore-tmdb.inpercima.net).

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate) version 0.3.3-SNAPSHOT.

## Prerequisites

### Angular CLI

* `angular-cli 7.3.8` or higher

### Apache and php

* `Apache 2.4` or higher
* `php 7.3` or higher

### Node, npm or yarn

* `node 10.15.3` or higher in combination with
  * `npm 6.4.1` or higher or
  * `yarn 1.13.0` or higher, used in this repository

## Dependency check

Some libraries could not be updated b/c of peer dependencies or knowing issues.

| library    | version | reason |
| ---------- | ------- | ------ |
| core-js    | 2.6.5   | [core-js@3, babel and a look into the future](https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md), newer version running into errors |
| typescript | 3.2.4   | @angular-devkit/build-angular > @ngtools/webpack@7.3.8" has incorrect peer dependency "typescript@>=2.4.0 < 3.3" |
| zone-js    | 0.8.29  | @angular/core@7.2.13" has incorrect peer dependency "zone.js@~0.8.26" |

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/explore-tmdb
cd explore-tmdb
```

## Usage

For the client check [explore-tmdb - client](https://github.com/inpercima/explore-tmdb/tree/master/client).

For the api check [explore-tmdb - api](https://github.com/inpercima/explore-tmdb/tree/master/api).
