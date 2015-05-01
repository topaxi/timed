import passport            from 'passport'
import LocalStrategy       from 'passport-local'
import { BadRequestError } from './error'
import User                from '../models/user'

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => User.findById(id, done))

let strategy = new LocalStrategy(async(name, password, done) => {
  try {
    let user = await User.findOne({ name }).exec()

    if (await comparePassword(user, password)) {
      throw new BadRequestError('Invalid login!')
    }

    done(null, user)
  }
  catch (err) {
    done(err)
  }
})

/* istanbul ignore next */
async function comparePassword(user, password) {
  return !user || !user.password || !await user.comparePassword(password)
}

passport.use(strategy)

export default [ passport.initialize(), passport.session() ]
