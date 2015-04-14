import mongoose from 'mongoose'
import config   from '../src/config'

export { default as Activity   } from './activity'
export { default as Assignment } from './assignment'
export { default as Attendance } from './attendance'
export { default as Customer   } from './customer'
export { default as Project    } from './project'
export { default as Setting    } from './setting'
export { default as Task       } from './task'
export { default as Team       } from './team'
export { default as User       } from './user'

mongoose.connect(config.mongodb)
