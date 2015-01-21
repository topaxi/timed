import { Router } from 'express'
import bcrypt     from 'bcrypt'
import User       from '../../../models/user'
import Task       from '../../../models/task'
import Project    from '../../../models/project'
import auth       from '../../../middleware/auth'

export default function(app) {
  var router = new Router
  router.use(auth)

  router.get('/', (req, res, next) => {
    User.find(function(err, users) {
      if (err) return next(err)

      users.forEach(deletePasswordForResponse)

      res.send({ users })
    })
  })

  router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return next(err)

      deletePasswordForResponse(user)

      res.send({ user })
    })
  })

  router.post('/', (req, res, next) => {
    var user = new User({ 'name':      req.body.user.name
                        , 'firstName': req.body.user.firstName
                        , 'lastName':  req.body.user.lastName
                        , 'quota':     req.body.user.quota
                        , 'password':  req.body.user.password
                        , 'projects':  req.body.user.projects
                        , 'worktime':  req.body.user.worktime
                        })

    user.save(err => {
      if (err) return next(err)

      deletePasswordForResponse(user)

      res.send({ user })
    })
  })

  // todo
  // router.put('/', fun...

  router.put('/:id', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return next(err)

      user.name      = req.body.user.name      || user.name
      user.firstName = req.body.user.firstName || user.firstName
      user.lastName  = req.body.user.lastName  || user.lastName
      user.quota     = req.body.user.quota     || user.quota
      user.projects  = req.body.user.projects  || user.projects
      user.worktime  = req.body.user.worktime  || user.worktime

      if (!req.body.user.password) {
        save()
      }
      else if (user.password) {
        bcrypt.compare(req.body.user.password, user.password, (err, equal) => {
          if (err) return next(err)

          if (equal) {
            save()
          }
          else {
            user.setPassword(req.body.user.password, save)
          }
        })
      }
      else {
        user.setPassword(req.body.user.password, save)
      }

      function save(err) {
        if (err) return next(err)

        user.save(err => {
          if (err) return next(err)

          // Update currently logged in user
          if (req.user._id == user._id) req.user = user

          deletePasswordForResponse(user)

          res.send({ user })
        })
      }
    })
  })

  router.delete('/:id', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return next(err)

      user.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })

  return router
}

function deletePasswordForResponse(user) {
  user.password = undefined
}
