import { Schema } from 'mongoose'

var Task = new Schema

Task.add({ 'name':     String
         , 'project':  { type: Schema.Types.ObjectId, ref: 'Project', required: true }
         , 'duration': Number
         , 'from':     Date
         , 'to':       Date
         , 'tasks':    [ Task ]
         , 'priority': Number
         , 'done':     Boolean
         })

Task.index({ 'name': 1, 'project': 1 }, { unique: true })

export default Task
