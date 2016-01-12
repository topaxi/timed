import mongoose, { Schema } from 'mongoose'

let ProjectSchema = new Schema

ProjectSchema.add({
  'name':           { type: String, required: true },
  'customer':       { type: Schema.Types.ObjectId, ref: 'Customer' },
  'projectLeaders': [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  'tracker':  {
    'type': { type: String, enum: [ 'github', 'redmine' ] },
    'data': {}
  },
  'from':  Date,
  'to':    Date,
  'done':  Boolean
})

ProjectSchema.index({ 'name': 1, 'customer': 1 }, { unique: true })

export default mongoose.model('Project', ProjectSchema)
