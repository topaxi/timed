var Schema  = require('mongoose').Schema

var Project = module.exports = new Schema({
    'name':     { type: String, required: true, index: { unique: true } }
  , 'customer': { type: Schema.Types.ObjectId, ref: 'Customer' }
  , 'from':  Date
  , 'to':    Date
  , 'done':  Boolean
})
