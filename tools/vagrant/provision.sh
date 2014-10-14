#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

function install() {
  install_core
  install_node
  install_mongodb
  install_nginx
  install_timed
}

function install_core() {
  apt-get update
  apt-get install -y curl build-essential git tmux htop
}

function install_mongodb() {
  apt-get install -y mongodb
}

function install_nginx() {
  apt-get install -y nginx

  # Fix weird caching behaviour - see http://stackoverflow.com/q/6236078/35189
  sed -i -e 's/sendfile\s\+on/sendfile off/' /etc/nginx/nginx.conf

  ln -sf /vagrant/tools/vagrant/nginx/timed.conf /etc/nginx/conf.d/timed.conf

  rm -f /etc/nginx/conf.d/default.conf
  rm -f /etc/nginx/sites-enabled/default.conf

  service nginx restart
}

function install_node() {
  curl -sL https://deb.nodesource.com/setup | bash -
  apt-get install -y nodejs
}

function install_timed() {
  cd /vagrant

  npm install npm       -g
  npm install bower     -g
  npm install ember-cli -g

  rm -rf /root/.npm
  rm -rf backend/node_modules
  rm -rf frontend/node_modules frontend/bower_components

  su vagrant -c 'make install'

  fix_broccoli_concat
}

# We're not able to create hardlinks in vbox shares (or any network mount).
function fix_broccoli_concat() {
  sed -i 's/fs\.linkSync/fs\.symlinkSync/g' /vagrant/frontend/node_modules/ember-cli/node_modules/broccoli-concat/index.js
}

install
