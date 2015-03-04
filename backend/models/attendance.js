import mongoose, { Schema }         from 'mongoose'
import Activity, { ActivitySchema } from './activity'

export default mongoose.model('Attendance', {
  'from':       { type: Date, required: true }
, 'to':         Date
, 'user':       { type: Schema.Types.ObjectId, ref: 'User', required: true }
, 'activities': [ ActivitySchema ]
})
