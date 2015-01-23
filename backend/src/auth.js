import passport      from 'passport'
import LocalStrategy from 'passport-local'
import User          from '../models/user'

export default function(app) {
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

  app.use(passport.initialize())
  app.use(passport.session())
}
