var Customer = require('../models/customer')
  , auth     = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/customers', auth, (req, res, next) => {
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

  app.get('/api/v1/customers/:id', auth, (req, res, next) => {
    Customer.findById(req.params.id, (err, customer) => {
      if (err) return next(err)

      res.send({ customer })
    })
  })

  app.post('/api/v1/customers', auth, (req, res, next) => {
    var customer = new Customer({ 'name': req.body.customer.name })

    customer.save(err => {
      if (err) return next(err)

      res.send({ customer })
    })
  })

  // todo
  // app.put('/api/v1/customers', auth, fun...

  app.put('/api/v1/customers/:id', auth, (req, res, next) => {
    Customer.findById(req.params.id, (err, customer) => {
      if (err) return next(err)

      customer.name = req.body.customer.name

      customer.save(err => {
        if (err) return next(err)

        res.send({ customer })
      })
    })
  })

  app.delete('/api/v1/customers/:id', auth, (req, res, next) => {
    Customer.findById(req.params.id, (err, customer) => {
      if (err) return next(err)

      customer.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
