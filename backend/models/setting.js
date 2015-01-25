import mongoose from 'mongoose'

export default mongoose.model('Setting', { 'name': String, 'value': String })
