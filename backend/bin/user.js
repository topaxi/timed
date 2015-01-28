#!/usr/bin/env node

require('6to5/register')

var config      = require('../config.json')
var RSVP        = require('rsvp')
var mongoose    = require('mongoose')
var read        = RSVP.denodeify(require('read'))
var User        = require('../models/user')
var user        = new User
var save        = RSVP.denodeify(user.save.bind(user))
var setPassword = RSVP.denodeify(user.setPassword.bind(user))

mongoose.connect(config.mongodb)

read({ 'prompt': 'Username: ' })
  .then(function(username) {
    user.name = username

    return read({ 'prompt': 'Password: ', 'silent': true }).then(setPassword)
  })
  .then(function() {
    return save()
  })
  .then(function() {
    console.log('User', user.name, 'created')
  })
  .catch(function(err) {
    console.error('Error %s: %s', err.code, err.message)
  })
  .finally(function() {
    process.exit()
  })
