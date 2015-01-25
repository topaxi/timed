import { Schema } from 'mongoose'
import ShortId    from 'mongoose-shortid'

export default new Schema({
  '_id':   ShortId
, 'name':  { type: String, required: true, index: { unique: true } }
, 'value': String
})
