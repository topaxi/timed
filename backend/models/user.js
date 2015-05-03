import mongoose, { Schema } from 'mongoose'
import bcrypt               from 'bcrypt'
import denodeify            from 'denodeify'

const compareHash = denodeify(bcrypt.compare)
const genSalt     = denodeify(bcrypt.genSalt)
const hash        = denodeify(bcrypt.hash)

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

/* istanbul ignore next*/
UserSchema.methods.setPassword = async function(password) {
  this.password = await encryptPassword(password)

  return this.password
}

UserSchema.methods.comparePassword = function(password) {
  return compareHash(password, this.password)
}

/* istanbul ignore next*/
async function encryptPassword(password) {
  return hash(password, await genSalt(PASSWORD_ROUNDS))
}

export default mongoose.model('User', UserSchema)
