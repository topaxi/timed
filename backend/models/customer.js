import mongoose from 'mongoose'

export default mongoose.model('Customer', {
  'name': { type: String, required: true, index: { unique: true } }
})
