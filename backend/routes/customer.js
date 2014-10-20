var Customer = require('../models/customer')
  , auth     = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/customers', auth, function(req, res, next) {
    if (req.query.name) {
      Customer.find({ 'name': req.query.name }, function(err, customers) {
        if (err) return next(err)

        res.send({ customers: customers })
      })
    }
    else {
      Customer.find(function(err, customers) {
        if (err) return next(err)

        res.send({ customers: customers })
      })
    }
  })

  app.get('/api/v1/customers/:id', auth, function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if (err) return next(err)

      res.send({ customer: customer })
    })
  })

  app.post('/api/v1/customers', auth, function(req, res, next) {
    var customer = new Customer({ 'name': req.body.customer.name })

    customer.save(function(err) {
      if (err) return next(err)

      res.send({ customer: customer })
    })
  })

  // todo
  // app.put('/api/v1/customers', auth, fun...

  app.put('/api/v1/customers/:id', auth, function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if (err) return next(err)

      customer.name = req.body.customer.name

      customer.save(function(err) {
        if (err) return next(err)

        res.send({ customer: customer })
      })
    })
  })

  app.delete('/api/v1/customers/:id', auth, function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if (err) return next(err)

      customer.remove(function(err) {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
