/*
 * GET home page.
 */
module.exports = function(app) {
  app.get('/', require('../middleware/auth.js'), function(req, res) {
    res.render('index')
  })

  app.get('/about', function(req, res) {
    res.render('about')
  })
}
