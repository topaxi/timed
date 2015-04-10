import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Project, Task } from '../../../models'

let router = new Router
export default router

router.get('/projects', async(function*(req, res, next) {
  let { ids }  = req.query
  let query    = ids && ids.length ? { '_id': { '$in': ids } } : req.query
  let projects = yield Project.find(query).exec()

  res.send({ projects })
}))

router.get('/projects/:id', async(function*(req, res, next) {
  let project = yield Project.findById(req.params.id).exec()

  if (!project) {
    throw new NotFoundError
  }

  res.send({ project })
}))

router.post('/projects', async(function*(req, res, next) {
  let project = new Project(req.body.project)

  yield project.save()

  res.status(201)
  res.pushModel({ project })
}))

// todo
// router.put('/', fun...

router.put('/projects/:id', async(function*(req, res, next) {
  let { id }              = req.params
  let { project: update } = req.body
  let project             = yield Project.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ project })
}))

router.delete('/projects/:id', async(function*({ params: { id } }, res, next) {
  let project = yield Project.findById(id).exec()

  yield Task.remove({ project })
  yield project.remove()

  // TODO: We should probably unload the project tasks on the clients too
  res.unloadModel('project', id)
}))
