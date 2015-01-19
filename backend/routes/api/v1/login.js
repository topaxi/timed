var Router   = require('express').Router
var passport = require('passport')
  , User     = require('../../../models/user')

module.exports = function(app) {
  var router = new Router

  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({ sessionId: req.sessionID, userId: req.user.id })
  })

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}
