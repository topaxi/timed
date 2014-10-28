var Schema = require('mongoose').Schema
  , User   = require('./user')

var Team = module.exports = new Schema({
  'name':  { type: String, required: true, index: { unique: true } }
, 'users': [{ type: Schema.Types.ObjectId, ref: 'User' }]
})
