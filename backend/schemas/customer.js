import { Schema  } from 'mongoose'

export default new Schema({
  'name': { type: String, required: true, index: { unique: true } }
})
