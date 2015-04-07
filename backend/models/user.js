import mongoose, { Schema } from 'mongoose'
import bcrypt               from 'bcrypt'

const PASSWORD_ROUNDS = 10

export const UserSchema = new Schema({
  'name':      { type: String, required: true, index: { unique: true } }
, 'firstName': String
, 'lastName':  String
, 'email':     String
, 'password':  String
, 'worktime':  {}
, 'projects':  [ { type: Schema.Types.ObjectId, ref: 'Project' } ]
})

UserSchema.methods.setPassword = function(password) {
  return encryptPassword(password).then(hash => this.password = hash)
}

UserSchema.methods.comparePassword = function(password) {
  /* istanbul ignore next */
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, this.password, (err, equal) =>
      err ? reject(err) : resolve(equal)
    )
  )
}

export default mongoose.model('User', UserSchema)

/* istanbul ignore next */
function encryptPassword(password) {
  return new Promise((resolve, reject) =>
    bcrypt.genSalt(PASSWORD_ROUNDS, (err, salt) =>
      err ? reject(err) : resolve(salt)
    )
  )
  .then(salt =>
    new Promise((resolve, reject) =>
      bcrypt.hash(password, salt, (err, hash) =>
        err ? reject(err) : resolve(hash)
      )
    )
  )
}
