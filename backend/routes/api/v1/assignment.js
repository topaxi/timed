import { Router }     from 'express'
import { async }      from '../../../src/async-route'
import { Assignment } from '../../../models'
import auth           from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let assignments = yield Assignment.find(req.query).exec()

  res.send({ assignments })
}))

router.post('/', auth, async(function*(req, res, next) {
  let assignment = new Assignment(req.body.assignment)

  yield assignment.saveAsync()

  res.send({ assignment })
}))

router.get('/:id', async(function*(req, res, next) {
  let assignment = yield Assignment.findById(req.params.id).exec()

  res.send({ assignment })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let assignment = yield Assignment.findById(req.params.id).exec()

  assignment.user     = req.body.assignment.user
  assignment.from     = req.body.assignment.from
  assignment.to       = req.body.assignment.to
  assignment.duration = req.body.assignment.duration
  assignment.project  = req.body.assignment.project
  assignment.tasks    = req.body.assignment.tasks

  yield assignment.saveAsync()

  res.send({ assignment })
}))

router.delete('/:id', async(function*(req, res, next) {
  let assignment = yield Assignment.findById(req.params.id).exec()

  yield assignment.removeAsync()

  res.send(true)
}))
