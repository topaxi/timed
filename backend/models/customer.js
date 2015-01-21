import mongoose       from 'mongoose'
import CustomerSchema from '../schemas/customer'

export default mongoose.model('Customer', CustomerSchema)
