#!/usr/bin/env node

require('babel/register')

var config      = require('../config.json')
var RSVP        = require('rsvp')
var co          = require('co')
var mongoose    = require('mongoose')
var read        = RSVP.denodeify(require('read'))
var User        = require('../models/user')
var user        = new User
var save        = RSVP.denodeify(user.save.bind(user))
var setPassword = RSVP.denodeify(user.setPassword.bind(user))

mongoose.connect(config.mongodb)

co(function*() {
  try {
    user.name = yield read({ 'prompt': 'Username: ' })

    yield setPassword(yield read({ 'prompt': 'Password: ', 'silent': true }))

    yield save()
    console.log('User', user.name, 'created')
  }
  catch (err) {
    console.error('Error %s: %s', err.code, err.message)
  }
  finally {
    process.exit()
  }
})
