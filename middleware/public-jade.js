var jade   = require('jade')
  , fs     = require('fs')
  , moment = require('moment')

module.exports = function(req, res, next) {
  if (!/.html$/.test(req.originalUrl)) {
    return next()
  }

  var file = req.originalUrl.replace(/html$/, 'jade')

  file = __dirname + '/../public/'+ file

  fs.readFile(file, function(err, str) {
    if (err) return next(err)

    var fn = jade.compile(str, { 'filename': file, 'pretty': true })

    var context = req.body || {}

    context.moment = moment

    res.send(fn(context))
  })
}
