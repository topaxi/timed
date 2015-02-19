Timed
=====

[![Build Status](https://travis-ci.org/topaxi/timed.svg)](https://travis-ci.org/topaxi/timed)

node.js Timetracking Software

Installation
============

Vagrant - The easy way
----------------------

If you want to setup Timed in a virtualmachine, all you need is
vagrant and virtualbox.
Then execute the following commands in this repository:
<code><pre>
$ vagrant up
$ make user # create your first user
$ make run  # starts the back- and frontend
</pre></code>

Manual setup - The "hard" way
-----------------------------

If you don't want a virtual development environment, you can install
Timed on your local machine.
You need the following packages installed on your machine:

- nginx
- mongodb
- nodejs
- npm
- bower

Then run the following commands in this repository:
<code><pre>
$ sudo ln -sf $PWD/tools/nginx/example.conf \
              /etc/nginx/sites-enabled/001-timed.conf
$ sudo /etc/init.d/nginx restart
$ sudo npm install ember-cli -g
$ make install
$ backend/bin/user.js # create your first user
$ make run-server     # you might need to install tmux to run this command
</code></pre>
