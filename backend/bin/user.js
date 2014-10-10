#!/usr/bin/env node

var config   = require('../config.json')
  , mongoose = require('mongoose')
  , read     = require('read')
  , User     = require('../models/user')
  , user     = new User

mongoose.connect(config.mongodb)

read({ 'prompt': 'Username: ' }, function(err, username) {
  user.name = username

  read({ 'prompt': 'Password: ', 'silent': true }, function(err, password) {
    user.setPassword(password, function(err) {
      if (err) throw err

      user.save(function(err) {
        if (err) throw err

        console.log('User', username, 'created')

        rl.close()
        process.exit()
      })
    })
  })
})
