import { Schema } from 'mongoose'

export default new Schema({
  'from':    { type: Date, required: true }
, 'to':      Date
, 'task':    { type: Schema.Types.ObjectId, ref: 'Task' }
, 'comment': String
, 'review':  Boolean
})
