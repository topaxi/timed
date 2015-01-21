import mongoose       from 'mongoose'
import ActivitySchema from '../schemas/activity'

export default mongoose.model('Activity', ActivitySchema)
