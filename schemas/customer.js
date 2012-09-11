var Schema  = require('mongoose').Schema

var Customer = module.exports = new Schema({
    'name':     { type: String, required: true, index: { unique: true } }
  , 'projects': [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})
