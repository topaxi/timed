import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Assignment }    from '../../../models'

let router = new Router
export default router

router.get('/assignments', async(function*(req, res, next) {
  let { query } = req

  if (query.from) query.from = { '$gte': new Date(+query.from) }
  if (query.to)   query.to   = { '$lte': new Date(+query.to  ) }

  let assignments = yield Assignment.find(query).exec()

  res.send({ assignments })
}))

router.post('/assignments', async(function*(req, res, next) {
  let assignment = new Assignment(req.body.assignment)

  yield assignment.save()

  res.status(201)
  res.pushModel({ assignment })
}))

router.get('/assignments/:id', async(function*(req, res, next) {
  let assignment = yield Assignment.findById(req.params.id).exec()

  if (!assignment) {
    throw new NotFoundError
  }

  res.send({ assignment })
}))

// todo
// router.put('/', fun...

router.put('/assignments/:id', async(function*(req, res, next) {
  let { id }                 = req.params
  let { assignment: update } = req.body
  let assignment             = yield Assignment.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ assignment })
}))

router.delete('/assignments/:id', async(function*({ params: { id } }, res, next) {
  yield Assignment.findByIdAndRemove(id).exec()

  res.unloadModel('attendance', id)
}))
