import mongoose from 'mongoose'

export default mongoose.model('TaskTemplate', { 'name': { type: String, required: true } })
