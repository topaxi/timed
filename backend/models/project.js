import mongoose      from 'mongoose'
import ProjectSchema from '../schemas/project'

export default mongoose.model('Project', ProjectSchema)
