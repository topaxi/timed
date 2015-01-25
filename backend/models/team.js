import mongoose, { Schema } from 'mongoose'

export default mongoose.model('Team', {
  'name':  { type: String, required: true, index: { unique: true } }
, 'users': [{ type: Schema.Types.ObjectId, ref: 'User' }]
})
