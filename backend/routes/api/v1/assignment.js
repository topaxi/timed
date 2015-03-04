import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Assignment }    from '../../../models'
import auth              from '../../../middleware/auth'

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

  if (!assignment) {
    throw new NotFoundError
  }

  res.send({ assignment })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let { id }                 = req.params
  let { assignment: update } = req.body
  let assignment             = yield Assignment.findByIdAndUpdate(id, update).exec()

  res.send({ assignment })
}))

router.delete('/:id', async(function*(req, res, next) {
  yield Assignment.findByIdAndRemove(req.params.id).exec()

  res.send(true)
}))
