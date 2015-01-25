import { Schema } from 'mongoose'
import ShortId    from 'mongoose-shortid'

export default new Schema({
  '_id':      ShortId
, 'from':     { type: Date, required: true }
, 'to':       Date
, 'duration': Number
, 'user':     { type: ShortId, ref: 'User' }
, 'project':  { type: ShortId, ref: 'Project' }
, 'tasks':    [{ type: ShortId, ref: 'Task' }]
})
