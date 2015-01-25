import { Schema } from 'mongoose'
import ShortId    from 'mongoose-shortid'

var Task = new Schema

Task.add({
  '_id':      ShortId
, 'name':     String
, 'project':  { type: ShortId, ref: 'Project', required: true }
, 'duration': Number
, 'from':     Date
, 'to':       Date
, 'tasks':    [ Task ]
, 'priority': Number
, 'done':     Boolean
})

Task.index({ 'name': 1, 'project': 1 }, { unique: true })

export default Task
