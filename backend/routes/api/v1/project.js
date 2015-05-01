import { Router }        from 'express'
import { NotFoundError } from '../../../src/error'
import { Project, Task } from '../../../models'

let router = new Router
export default router

router.get('/projects', async(req, res, next) => {
  let { ids }  = req.query
  let query    = ids && ids.length ? { '_id': { '$in': ids } } : req.query
  let projects = await Project.find(query).lean(true).exec()

  res.send({ projects })
})

router.get('/projects/:id', async(req, res, next) => {
  let project = await Project.findById(req.params.id).lean(true).exec()

  if (!project) {
    throw new NotFoundError
  }

  res.send({ project })
})

router.post('/projects', async(req, res, next) => {
  let project = new Project(req.body.project)

  await project.save()

  res.status(201)
  res.pushModel({ project })
})

// todo
// router.put('/', fun...

router.put('/projects/:id', async(req, res, next) => {
  let { id }              = req.params
  let { project: update } = req.body
  let project             = await Project.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ project })
})

router.delete('/projects/:id', async({ params: { id } }, res, next) => {
  let project = await Project.findById(id).exec()

  await Task.remove({ project })
  await project.remove()

  // TODO: We should probably unload the project tasks on the clients too
  res.unloadModel('project', id)
})
