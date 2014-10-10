var passport = require('passport')
  , User     = require('../models/user')

module.exports = function(app) {
  app.post('/api/v1/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err)

      res.send({ userId: user.id })
    })(req, res, next)
  })

  app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
}
