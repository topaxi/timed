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

  ln -sf /vagrant/tools/vagrant/nginx/timed.conf /etc/nginx/sites-enabled/001-timed.conf

  rm -f /etc/nginx/conf.d/default.conf
  rm -f /etc/nginx/sites-enabled/default

  setup_nginx_ssl

  service nginx restart
}

function setup_nginx_ssl() {
  mkdir -p /etc/nginx/ssl

  cd /etc/nginx/ssl

  openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out server.key
  chmod 600 server.key
  openssl req -new -key server.key -out server.csr -subj "/C=CH/ST=Bern/L=Bern/O=timed/CN=timed.vm"
  openssl x509 -sha256 -req -days 365 -in server.csr -signkey server.key -out server.crt
}

function install_node() {
  curl -sL https://deb.nodesource.com/setup | bash -
  apt-get install -y nodejs
}

function install_timed() {
  cd /vagrant

  npm install npm       -g
  npm install bower     -g
  npm install nodemon   -g
  npm install ember-cli -g

  rm -rf /root/.npm
  rm -rf backend/node_modules
  rm -rf frontend/node_modules frontend/bower_components

  su vagrant -c 'make install'
}

install
