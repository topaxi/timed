var User   = require('../models/user')
  , bcrypt = require('bcrypt')

module.exports = function(app) {
  app.get('/user/current', function(req, res) {
    var user = JSON.parse(JSON.stringify(req.user))

    delete user.password

    res.send(user)
  })

  app.get('/user/projects', function(req, res) {
  
  })

  app.get('/user', function(req, res, next) {
    User.find(function(err, users) {
      if (err) return next(err)

      users.forEach(deletePassword)

      res.send(users)
    })
  })

  app.get('/user/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err)

      user.password = undefined

      res.send(user)
    })
  })

  app.post('/user', function(req, res, next) {
    var user = new User({ 'name': req.body.name })

    user.save(function(err) {
      if (err) return next(err)

      user.password = undefined

      res.send(user)
    })
  })

  // todo
  // app.put('/user', fun...

  app.put('/user/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err)

      user.name        = req.body.name
      user.quota       = req.body.quota
      user.attendances = req.body.attendances

      if (!req.body.password) {
        save()
      }
      else if (user.password) {
        bcrypt.compare(req.body.password, user.password, function(err, equal) {
          if (err) return next(err)

          if (equal) {
            save()
          }
          else {
            encryptPassword(req.body.password, saveWithPassword)
          }
        })
      }
      else {
        encryptPassword(req.body.password, saveWithPassword)
      }

      function saveWithPassword(err, hash) {
        if (err) next(err)

        user.password = hash

        save()
      }

      function save() {
        user.save(function(err) {
          if (err) return next(err)

          // Update currently logged in user
          if (req.user._id == user._id) req.user = user

          user.password = undefined

          res.send(user)
        })
      }
    })
  })

  app.delete('/user/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err)

      user.remove(function(err) {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}

function deletePassword(user) {
  user.password = undefined
}

function encryptPassword(password, cb) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return cb(err)

    bcrypt.hash(password, salt, cb)
  })
}
