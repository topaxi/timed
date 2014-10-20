var passport = require('passport')
  , User     = require('../models/user')

module.exports = function(app) {
  app.post('/api/v1/login', passport.authenticate('local'), function(req, res) {
    res.send({ sessionId: req.sessionID, userId: req.user.id })
  })

  app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
}
