#!/usr/bin/env node

require('babel/register')

var RSVP = require('rsvp')
var co   = require('co')
var read = RSVP.denodeify(require('read'))
var User = require('../models').User

co(function*() {
  try {
    var user = new User

    user.name = yield read({ 'prompt': 'Username: ' })

    yield user.setPassword(yield read({ 'prompt': 'Password: ', 'silent': true }))
    yield user.save()

    console.log('User', user.name, 'created')
  }
  catch (err) {
    console.error('Error %s: %s', err.code, err.message)
  }
  finally {
    process.exit()
  }
})
