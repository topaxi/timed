import mongoose, { Schema } from 'mongoose'

export default mongoose.model('Activity', {
  'from':    { type: Date, required: true }
, 'to':      Date
, 'task':    { type: Schema.Types.ObjectId, ref: 'Task' }
, 'comment': String
, 'review':  Boolean
})
