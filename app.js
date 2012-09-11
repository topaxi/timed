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

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  });
});

app.configure(function() {
  var SessionMongoose = require('session-mongoose')
    , LocalStrategy   = require('passport-local').Strategy

  passport.use(new LocalStrategy(
    function(username, password, done) {
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      User.findOne({ 'name': username }, function(err, user) {
        if (err) return done(err)

        if (!user) return done(null, false, { message: 'Unknown user ' + username })

        if (user.password != password) return done(null, false, { message: 'Invalid password' })

        return done(null, user)
      })
    }
  ))

  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.cookieParser())
  app.use(express.session({ 'secret': '12345678'
                          , 'store':  new SessionMongoose({'url': config.mongodb })
                          }))
  app.use(express.methodOverride())
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(require('connect-flash')())
  app.use(app.router)
  app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
  app.use(express.static(path.join(__dirname, 'public')))
});

app.configure('development', function() {
  app.use(express.errorHandler())
});

function login(req, res, next) {
  res.render('login', { title: 'Timed' })
}

require('./routes')(app)
require('./routes/user')(app)
require('./routes/project')(app)
require('./routes/customer')(app)
require('./routes/login')(app)

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'))
})
