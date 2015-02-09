import { Router } from 'express'
import Project    from '../../../models/project'
import Task       from '../../../models/task'
import auth       from '../../../middleware/auth'

export default function(app) {
  var router = new Router
  router.use(auth)

  router.get('/', (req, res, next) => {
    var { ids } = req.query

    if (ids && ids.length) {
      Project.find({ '_id': { '$in': ids } }, (err, projects) => {
        if (err) return next(err)

        res.send({ projects })
      })
    }
    else {
      Project.find((err, projects) => {
        if (err) return next(err)

        res.send({ projects })
      })
    }
  })

  router.get('/:id', (req, res, next) => {
    Project.findById(req.params.id, (err, project) => {
      if (err) return next(err)

      res.send({ project })
    })
  })

  router.post('/', (req, res, next) => {
    var project = new Project({ 'name':     req.body.project.name
                              , 'customer': req.body.project.customer
                              , 'tracker':  req.body.project.tracker
                              , 'from':     req.body.project.from
                              , 'to':       req.body.project.to
                              , 'done':     req.body.project.done
                              })

    project.save(err => {
      if (err) return next(err)

      res.send({ project })
    })
  })

  // todo
  // router.put('/', fun...

  router.put('/:id', (req, res, next) => {
    Project.findById(req.params.id, (err, project) => {
      if (err) return next(err)

      project.name     = req.body.project.name
      project.customer = req.body.project.customer
      project.tracker  = req.body.project.tracker
      project.from     = req.body.project.from
      project.to       = req.body.project.to
      project.done     = req.body.project.done

      project.save(err => {
        if (err) return next(err)

        res.send({ project })
      })
    })
  })

  router.delete('/:id', (req, res, next) => {
    Project.findById(req.params.id, (err, project) => {
      if (err) return next(err)

      Task.remove({ project }, err => {
        if (err) return next(err)

        project.remove(err => {
          if (err) return next(err)

          return res.send(true)
        })
      })
    })
  })

  return router
}
