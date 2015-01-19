var passport = require('passport')
  , User     = require('../models/user')

module.exports = function(app) {
  app.post('/api/v1/login', passport.authenticate('local'), (req, res) => {
    res.send({ sessionId: req.sessionID, userId: req.user.id })
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}
