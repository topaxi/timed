import mongoose, { Schema } from 'mongoose'

export default mongoose.model('Assignment', {
  'from':     { type: Date, required: true }
, 'to':       Date
, 'duration': Number
, 'user':     { type: Schema.Types.ObjectId, ref: 'User' }
, 'project':  { type: Schema.Types.ObjectId, ref: 'Project' }
, 'tasks':    [ { type: Schema.Types.ObjectId, ref: 'Task' } ]
})
