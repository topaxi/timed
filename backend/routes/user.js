var User    = require('../models/user')
  , Task    = require('../models/task')
  , Project = require('../models/project')
  , bcrypt  = require('bcrypt')

module.exports = function(app) {
  app.get('/api/v1/users', function(req, res, next) {
    User.find(function(err, users) {
      if (err) return next(err)

      users.forEach(deletePasswordForResponse)

      res.send({ users: users })
    })
  })

  app.get('/api/v1/user/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err)

      deletePasswordForResponse(user)

      res.send({ user: user })
    })
  })

  app.post('/api/v1/users', function(req, res, next) {
    var user = new User({ 'name':     req.body.name
                        , 'quota':    req.body.quota
                        , 'password': req.body.password
                        , 'projects': req.body.projects
                        , 'worktime': req.body.worktime
                        })

    user.save(function(err) {
      if (err) return next(err)

      deletePasswordForResponse(user.password)

      res.send({ user: user })
    })
  })

  // todo
  // app.put('/api/v1/user', fun...

  app.put('/api/v1/user/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err)

      user.name        = req.body.name
      user.quota       = req.body.quota
      user.attendances = req.body.attendances
      user.projects    = req.body.projects
      user.worktime    = req.body.worktime

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
            user.setPassword(req.body.password, save)
          }
        })
      }
      else {
        user.setPassword(req.body.password, save)
      }

      function save(err) {
        if (err) return next(err)

        user.save(function(err) {
          if (err) return next(err)

          // Update currently logged in user
          if (req.user._id == user._id) req.user = user

          deletePasswordForResponse(user)

          res.send({ user: user })
        })
      }
    })
  })

  app.delete('/api/v1/user/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err)

      user.remove(function(err) {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}

function deletePasswordForResponse(user) {
  user.password = undefined
}
