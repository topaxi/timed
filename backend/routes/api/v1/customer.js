import { Router } from 'express'
import Customer   from '../../../models/customer'
import auth       from '../../../middleware/auth'

export default function(app) {
  var router = new Router
  router.use(auth)

  router.get('/', (req, res, next) => {
    var { name } = req.query

    if (name) {
      Customer.find({ name }, (err, customers) => {
        if (err) return next(err)

        res.send({ customers })
      })
    }
    else {
      Customer.find((err, customers) => {
        if (err) return next(err)

        res.send({ customers })
      })
    }
  })

  router.post('/', (req, res, next) => {
    var customer = new Customer({ 'name': req.body.customer.name })

    customer.save(err => {
      if (err) return next(err)

      res.send({ customer })
    })
  })

  router.get('/:id', (req, res, next) => {
    Customer.findById(req.params.id, (err, customer) => {
      if (err) return next(err)

      res.send({ customer })
    })
  })

  // todo
  // router.put('/', fun...

  router.put('/:id', (req, res, next) => {
    Customer.findById(req.params.id, (err, customer) => {
      if (err) return next(err)

      customer.name = req.body.customer.name

      customer.save(err => {
        if (err) return next(err)

        res.send({ customer })
      })
    })
  })

  router.delete('/:id', (req, res, next) => {
    Customer.findById(req.params.id, (err, customer) => {
      if (err) return next(err)

      customer.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })

  return router
}
