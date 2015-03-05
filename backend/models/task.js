import mongoose, { Schema } from 'mongoose'
import Task                 from './task'

let TaskSchema = new Schema

TaskSchema.add({
  'name':     { type: String, required: true }
, 'project':  { type: Schema.Types.ObjectId, ref: 'Project', required: true }
, 'duration': Number
, 'from':     Date
, 'to':       Date
, 'tasks':    [ Task ]
, 'priority': Number
, 'done':     Boolean
})

TaskSchema.index({ 'name': 1, 'project': 1 }, { unique: true })

export default mongoose.model('Task', TaskSchema)
