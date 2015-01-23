import express       from 'express'
import bodyParser    from 'body-parser'
import cookieParser  from 'cookie-parser'
import session       from 'express-session'
import http          from 'http'
import path          from 'path'
import bcrypt        from 'bcrypt'
import mongoose      from 'mongoose'
import connectMongo  from 'connect-mongo'
import passport      from 'passport'
import LocalStrategy from 'passport-local'
import config        from '../config.json'
import User          from '../models/user'

mongoose.connect(config.mongodb)

var app = express()

if (config.title) {
  app.set('title', `Timed - ${config.title}`)
}
else {
  app.set('title', 'Timed')
}

app.set('trust proxy', config.trustProxy)
app.use(require('morgan')('dev'))

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => User.findById(id, done))

passport.use(new LocalStrategy((name, password, done) => {
  User.findOne({ name }, (err, user) => {
    if (err)   return done(err)
    if (!user) return done(new Error('Invalid login!'))

    bcrypt.compare(password, user.password, (err, equal) => {
      if (err)    return done(err)
      if (!equal) return done(new Error('Invalid login!'))

      return done(null, user)
    })
  })
}))

app.set('port', process.env.PORT || config.port || 3000)

app.use(bodyParser.urlencoded({ 'extended': false }))
app.use(bodyParser.json())
//app.use(require('serve-favicon')())

app.use(cookieParser(config.cookieSecret))

var MongoStore = connectMongo(session)
app.use(session({ 'secret':            config.cookieSecret
                , 'resave':            false
                , 'saveUninitialized': true
                , 'store':             new MongoStore({ 'url': config.mongodb })
                }))
app.use(passport.initialize())
app.use(passport.session())

require('../routes')(app)

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({ message: err.message, error: true })
})

http.createServer(app).listen(app.get('port'), () =>
  console.log('Express server listening on port %d', app.get('port'))
)
