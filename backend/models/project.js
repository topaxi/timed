import mongoose, { Schema } from 'mongoose'

export default mongoose.model('Project', {
  'name':     { type: String, required: true, index: { unique: true } }
, 'customer': { type: Schema.Types.ObjectId, ref: 'Customer' }
, 'from':     Date
, 'to':       Date
, 'done':     Boolean
})
