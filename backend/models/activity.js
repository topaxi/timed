import mongoose, { Schema } from 'mongoose'

export const ActivitySchema = new Schema({
  'from':    { type: Date, required: true }
, 'to':      Date
, 'task':    { type: Schema.Types.ObjectId, ref: 'Task' }
, 'comment': String
, 'review':  Boolean
})

export default mongoose.model('Activity', ActivitySchema)
