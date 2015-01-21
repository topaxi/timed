import mongoose   from 'mongoose'
import TeamSchema from '../schemas/team'

export default mongoose.model('Team', TeamSchema)
