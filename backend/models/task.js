import mongoose   from 'mongoose'
import TaskSchema from '../schemas/task'

export default mongoose.model('Task', TaskSchema)
