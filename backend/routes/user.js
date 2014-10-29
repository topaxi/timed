var User    = require('../models/user')
  , Task    = require('../models/task')
  , Project = require('../models/project')
  , auth    = require('../middleware/auth')
  , bcrypt  = require('bcrypt')

module.exports = function(app) {
  app.get('/api/v1/users', auth, function(req, res, next) {
    User.find(function(err, users) {
      if (err) return next(err)

      users.forEach(deletePasswordForResponse)

      res.send({ users: users })
    })
  })

  app.get('/api/v1/users/:id', auth, function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err)

      deletePasswordForResponse(user)

      res.send({ user: user })
    })
  })

  app.post('/api/v1/users', auth, function(req, res, next) {
    var user = new User({ 'name':      req.body.user.name
                        , 'firstName': req.body.user.firstName
                        , 'lastName':  req.body.user.lastName
                        , 'quota':     req.body.user.quota
                        , 'password':  req.body.user.password
                        , 'projects':  req.body.user.projects
                        , 'worktime':  req.body.user.worktime
                        })

    user.save(function(err) {
      if (err) return next(err)

      deletePasswordForResponse(user)

      res.send({ user: user })
    })
  })

  // todo
  // app.put('/api/v1/users', auth, fun...

  app.put('/api/v1/users/:id', auth, function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err)

      user.name        = req.body.user.name        || user.name
      user.firstName   = req.body.user.firstName   || user.firstName
      user.lastName    = req.body.user.lastName    || user.lastName
      user.quota       = req.body.user.quota       || user.quota
      user.attendances = req.body.user.attendances || user.attendances
      user.projects    = req.body.user.projects    || user.projects
      user.assignments = req.body.user.assignments || user.assignments
      user.worktime    = req.body.user.worktime    || user.worktime

      if (!req.body.user.password) {
        save()
      }
      else if (user.password) {
        bcrypt.compare(req.body.user.password, user.password, function(err, equal) {
          if (err) return next(err)

          if (equal) {
            save()
          }
          else {
            user.setPassword(req.body.user.password, save)
          }
        })
      }
      else {
        user.setPassword(req.body.user.password, save)
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

  app.delete('/api/v1/users/:id', auth, function(req, res, next) {
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
