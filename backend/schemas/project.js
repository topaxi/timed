import { Schema } from 'mongoose'

export default new Schema({
  'name':     { type: String, required: true, index: { unique: true } }
, 'customer': { type: Schema.Types.ObjectId, ref: 'Customer' }
, 'from':     Date
, 'to':       Date
, 'done':     Boolean
})
