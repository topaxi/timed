var passport = require('passport')
  , User     = require('../models/user')

module.exports = function(app) {
  var auth = passport.authenticate('local', { 'failureRedirect': '/login', 'failureFlash': true })

  app.post('/api/v1/login', auth, function(req, res) {
    res.send({ userId: req.user.id })
  })

  app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
}
