import mongoose         from 'mongoose'
import AttendanceSchema from '../schemas/attendance'

export default mongoose.model('Attendance', AttendanceSchema)
