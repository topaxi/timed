var Schema = require('mongoose').Schema

var Activity = module.exports = new Schema({
    'from': { type: Date, required: true }
  , 'to':   Date
  , 'task': { type: Schema.Types.ObjectId, ref: 'Task' }
})
