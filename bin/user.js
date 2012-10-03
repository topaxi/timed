#!/usr/bin/env node

var config   = require('../config.json')
  , mongoose = require('mongoose')
  , rl       = require('readline').createInterface({ input:  process.stdin
                                                   , output: process.stdout
                                                   })
  , User     = require('../models/user')
  , user     = new User

mongoose.connect(config.mongodb)

rl.question('Username: ', function(username) {
  user.name = username

  rl.question('Password: ', function(password) {
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
