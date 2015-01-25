import { Schema } from 'mongoose'
import ShortId    from 'mongoose-shortid'
import Activity   from './activity'

export default new Schema({
  '_id':        ShortId
, 'from':       { type: Date, required: true }
, 'to':         Date
, 'user':       { type: ShortId, ref: 'User' }
, 'activities': [ Activity ]
})
