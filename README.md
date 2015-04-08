Timed
=====

[![Build Status](https://travis-ci.org/topaxi/timed.svg)](https://travis-ci.org/topaxi/timed)
[![Coverage Status](https://coveralls.io/repos/topaxi/timed/badge.svg?branch=master)](https://coveralls.io/r/topaxi/timed?branch=master)
[![Code Climate](https://codeclimate.com/github/topaxi/timed/badges/gpa.svg)](https://codeclimate.com/github/topaxi/timed)

node.js Timetracking Software

Installation
============

Vagrant - The easy way
----------------------

If you want to setup Timed in a virtualmachine, all you need is
vagrant and virtualbox.
Then execute the following commands in this repository:

```shell
$ vagrant up
$ make user # create your first user
$ make run  # starts the back- and frontend
```

After that, you should be able to visit http://timed.vm/ in your browser.

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
$ npm install ember-cli -g
$ make install
$ node --harmony backend/bin/user.js # create your first user
$ make run-server                    # you might need to install tmux to run this command
```

After that, you should be able to visit http://localhost:4200/ in your browser.
