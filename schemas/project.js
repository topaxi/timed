var Schema  = require('mongoose').Schema

var Project = module.exports = new Schema({
    'name':  { type: String, required: true, index: { unique: true } }
  , 'from':  Date
  , 'to':    Date
  , 'done':  Boolean
})
