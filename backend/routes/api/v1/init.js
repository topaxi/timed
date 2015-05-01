import { Router }          from 'express'
import moment              from 'moment'

import { BadRequestError } from '../../../src/error'
import * as model          from '../../../models'

let router = new Router
export default router

router.get('/init/payload', async(req, res) => {
  if (!req.user || !req.user.id) throw new BadRequestError

  let query = {
    user: req.user.id
  , from: { '$gt': moment().startOf('day').subtract(1, 'month') }
  }

  res.send({
    customers:   await model.Customer.find({}).lean(true).exec()
  , projects:    await model.Project.find({}).lean(true).exec()
  , tasks:       await model.Task.find({}).lean(true).exec()
  , attendances: await model.Attendance.find(query).lean(true).exec()
  })
})
