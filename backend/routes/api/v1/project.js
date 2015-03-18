import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Project, Task } from '../../../models'
import auth              from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let { ids }  = req.query
  let query    = ids && ids.length ? { '_id': { '$in': ids } } : req.query
  let projects = yield Project.find(query).exec()

  res.send({ projects })
}))

router.get('/:id', async(function*(req, res, next) {
  let project = yield Project.findById(req.params.id).exec()

  if (!project) {
    throw new NotFoundError
  }

  res.send({ project })
}))

router.post('/', async(function*(req, res, next) {
  let project = new Project(req.body.project)

  yield project.saveAsync()

  res.status(201)
  res.send({ project })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let { id }              = req.params
  let { project: update } = req.body
  let project             = yield Project.findByIdAndUpdate(id, update).exec()

  res.send({ project })
}))

router.delete('/:id', async(function*(req, res, next) {
  let project = yield Project.findById(req.params.id).exec()

  yield Task.removeAsync({ project })
  yield project.removeAsync()

  res.send(true)
}))
