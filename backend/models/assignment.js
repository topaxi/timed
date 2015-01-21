import mongoose         from 'mongoose'
import AssignmentSchema from '../schemas/assignment'

export default mongoose.model('Assignment', AssignmentSchema)
