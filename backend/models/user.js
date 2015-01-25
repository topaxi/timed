import mongoose, { Schema } from 'mongoose'
import bcrypt               from 'bcrypt'

var UserSchema = new Schema({
  'name':      { type: String, required: true, index: { unique: true } }
, 'firstName': String
, 'lastName':  String
, 'password':  String
, 'worktime':  {}
, 'projects':  [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})

UserSchema.methods.setPassword = function(password, cb) {
  encryptPassword(password, (err, hash) => {
    if (err) return cb(err)

    this.password = hash

    cb(null)
  })
}

export default mongoose.model('User', UserSchema)

function encryptPassword(password, cb) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return cb(err)

    bcrypt.hash(password, salt, cb)
  })
}
