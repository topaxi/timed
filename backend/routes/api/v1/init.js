import { Router }          from 'express'
import moment              from 'moment'

import { async }           from '../../../src/async-route'
import { BadRequestError } from '../../../src/error'
import * as model          from '../../../models'

let router = new Router
export default router

router.get('/init/payload', async(function*(req, res) {
  if (!req.user || !req.user.id) throw new BadRequestError

  let query = {
    user: req.user.id
  , from: { '$gt': moment().startOf('day').subtract(1, 'month') }
  }

  res.send({
    customers:   yield model.Customer.find().exec()
  , projects:    yield model.Project.find().exec()
  , tasks:       yield model.Task.find().exec()
  , attendances: yield model.Attendance.find(query).exec()
  })
}))
