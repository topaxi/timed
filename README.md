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

If you want to setup Timed in a virtualmachine, all you need is
iojs and docker.
Then execute the following commands in this repository:

```shell
$ make install                # install dependencies
$ make docker                 # starts the back- and frontend
$ make -C docker import-data  # import some data to work with
$ make -C docker user         # create your first user with password
$ make -C docker mongo        # drop into the mongo shell
```

After that, you should be able to visit http://localhost:8080/ in your browser.

Manual setup - The "hard" way
-----------------------------

If you don't want a virtual development environment, you can install
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
$ npm --prefix=./backend run new-user    # create your first user
$ npm --prefix=./backend run import-data # import some data to work with
$ make run-server                        # you need tmux to run this command
```

After that, you should be able to visit http://localhost:4200/ in your browser.
