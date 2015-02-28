import mongoose from 'mongoose'
import Model    from 'mongoose/lib/model'
import config   from '../config.json'

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

// Promisify Model.save, Model#save, Model.remove and Model#remove
for (let method of [ 'save', 'remove' ]) {
  let name = `${method}Async`
  let fn   = function(...args) {
    return new Promise((resolve, reject) =>
      this[method](...args, (err, ...values) =>
        err ? reject(err) : resolve(...values)
      )
    )
  }

  Model[name] = fn
  mongoose.Document.prototype[name] = fn
}
