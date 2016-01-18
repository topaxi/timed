import { Router }           from 'express'
import { TaskTemplate } from '../../../models'

let router = new Router
export default router

router.get('/task-templates', async(req, res, next) => {
  let taskTemplates   = await TaskTemplate.find({}).lean(true).exec()

  res.send({ 'task-templates': taskTemplates })
})
