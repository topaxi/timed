var Schema = require('mongoose').Schema

var Assignment = module.exports = new Schema({
  'from':     { type: Date, required: true }
, 'to':       Date
, 'duration': Number
, 'user':     { type: Schema.Types.ObjectId, ref: 'User' }
, 'project':  { type: Schema.Types.ObjectId, ref: 'Project' }
, 'tasks':    [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})
