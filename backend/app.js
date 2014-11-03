#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express  = require('express')
  , http     = require('http')
  , path     = require('path')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , config   = require('./config.json')
  , User     = require('./models/user')

mongoose.connect(config.mongodb)

var app = express()

if (config.title) {
  app.set('title', 'Timed - '+ config.title)
}
else {
  app.set('title', 'Timed')
}

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, done)
})

var LocalStrategy = require('passport-local').Strategy
  , bcrypt        = require('bcrypt')

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ 'name': username }, function(err, user) {
      if (err)   return done(err)
      if (!user) return done(new Error('Invalid login!'))

      bcrypt.compare(password, user.password, function(err, equal) {
        if (err)    return done(err)
        if (!equal) return done(new Error('Invalid login!'))

        return done(null, user)
      })
    })
  }
))

app.set('port', process.env.PORT || config.port || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ 'extended': false }))
app.use(bodyParser.json())
//app.use(require('serve-favicon')())

app.use(require('cookie-parser')(config.cookieSecret))

var expressSession = require('express-session')
  , MongoStore     = require('connect-mongo')(expressSession)
app.use(expressSession({ 'secret':            config.cookieSecret
                       , 'resave':            false
                       , 'saveUninitialized': true
                       , 'store':             new MongoStore({ 'url': config.mongodb })
                       }))
app.use(passport.initialize())
app.use(passport.session())
app.use(function(req, res, next) {
  res.locals.user = req.user
  res.locals.req  = req
  next()
})

require('./routes/project')(app)
require('./routes/task')(app)
require('./routes/customer')(app)
require('./routes/team')(app)
require('./routes/assignment')(app)
require('./routes/attendance')(app)
require('./routes/user')(app)
require('./routes/login')(app)

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send({ message: err.message, error: true })
})

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})
