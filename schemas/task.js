var Schema = require('mongoose').Schema

var Task = module.exports = new Schema

Task.add({ 'name':     String
         , 'project':  { type: Schema.Types.ObjectId, ref: 'Project', required: true }
         , 'duration': Number
         , 'from':     Date
         , 'to':       Date
         , 'tasks':    [ Task ]
         , 'done':     Boolean
         })

Task.index({ 'name': 1, 'project': 1 }, { unique: true })
