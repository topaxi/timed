var Schema     = require('mongoose').Schema
  , Attendance = require('./attendance')
  , bcrypt     = require('bcrypt')

var User = module.exports = new Schema({
    'name':        { type: String, required: true, index: { unique: true } }
  , 'firstName':   String
  , 'lastName':    String
  , 'password':    String
  , 'worktime':    {}
  , 'attendances': [ Attendance ]
  , 'projects':    [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})

User.methods.setPassword = function(password, cb) {
  var user = this

  encryptPassword(password, function(err, hash) {
    if (err) return cb(err)

    user.password = hash

    cb(null)
  })
}

function encryptPassword(password, cb) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return cb(err)

    bcrypt.hash(password, salt, cb)
  })
}
