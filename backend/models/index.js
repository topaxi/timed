import mongoose from 'mongoose'
import app      from '../src/app'

export { default as Activity   } from './activity'
export { default as Assignment } from './assignment'
export { default as Attendance } from './attendance'
export { default as Customer   } from './customer'
export { default as Project    } from './project'
export { default as Setting    } from './setting'
export { default as Task       } from './task'
export { default as Team       } from './team'
export { default as User       } from './user'

mongoose.connect(app.get('mongodb'))
