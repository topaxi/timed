import { Schema } from 'mongoose'
import Activity   from './activity'

export default new Schema({
  'from':       { type: Date, required: true }
, 'to':         Date
, 'user':       { type: Schema.Types.ObjectId, ref: 'User' }
, 'activities': [ Activity ]
})
