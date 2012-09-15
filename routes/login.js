var passport = require('passport')
  , User     = require('../models/user')

module.exports = function(app) {
  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('error') })
  })

  app.post('/login',
    passport.authenticate('local', { 'failureRedirect': '/login', 'failureFlash': true }),
    function(req, res) {
      res.redirect('/')
    }
  )

  app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
}
