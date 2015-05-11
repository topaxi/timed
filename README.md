Timed
=====

[![Build Status](https://travis-ci.org/topaxi/timed.svg)](https://travis-ci.org/topaxi/timed)
[![Coverage Status](https://coveralls.io/repos/topaxi/timed/badge.svg?branch=master)](https://coveralls.io/r/topaxi/timed?branch=master)
[![Code Climate](https://codeclimate.com/github/topaxi/timed/badges/gpa.svg)](https://codeclimate.com/github/topaxi/timed)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/timed.svg)](https://saucelabs.com/u/timed)

node.js Timetracking Software

Installation
============

Docker - The easy way
----------------------

You need the following packages installed on your machine:

- docker
- npm
- bower

Then execute the following commands in this repository:

```shell
$ make install               # install dependencies
$ make docker                # starts the back- and frontend
$ make -C docker user        # create your first user with password
$ make -C docker import-data # optional, import some data to work with
$ make -C docker mongo       # optional, drop into the mongo shell
```

Run tests

```shell
$ make -C docker test-backend  # run backend tests
$ make -C docker test-frontend # run frontend tests in saucelabs
$ make -C docker test          # run backend then frontend tests
```


After that, you should be able to visit http://localhost:8080/ in your browser.

Manual setup - The "hard" way
-----------------------------

If you don't want to use the docker environment, you can install
Timed on your local machine.

You need the following packages installed on your machine:

- mongodb
- nodejs or iojs
- npm
- bower

Then run the following commands in this repository:

```shell
$ npm install ember-cli -g               # install ember-cli
$ make install                           # install dependencies
$ make user                              # create your first user
$ npm --prefix=./backend run import-data # optional, import some data to work with
$ make run-frontend                      # start the frontend
$ make run-backend                       # start the backend
$ make run-server                        # optional, run back- and frontend in tmux
```

Run tests

```shell
$ make test-backend  # run backend tests
$ make test-frontend # run frontend tests server
```

After that, you should be able to visit http://localhost:4200/ in your browser.
