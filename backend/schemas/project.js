import { Schema } from 'mongoose'
import ShortId    from 'mongoose-shortid'

export default new Schema({
  '_id':      ShortId
, 'name':     { type: String, required: true, index: { unique: true } }
, 'customer': { type: ShortId, ref: 'Customer' }
, 'from':     Date
, 'to':       Date
, 'done':     Boolean
})
