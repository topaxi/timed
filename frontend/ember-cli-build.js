/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'eslint': {
      'testGenerator': require('./lib/eslint-test-generator')
    }
  , 'babel': {
      'optional': [ 'es7.asyncFunctions' ]
    }
  , 'ember-cli-selectize': {
      'theme': 'bootstrap3'
    }
  , 'ember-cli-qunit': {
      'useLintTree': false
    }
  })

  app.import('vendor/babel-polyfill.js', { 'prepend': true })
  app.import('bower_components/fetch/fetch.js')

  app.import('bower_components/ramjet/dist/ramjet.js')

  app.import('bower_components/socket.io-client/socket.io.js', { 'exports': { 'io': [ 'default' ] } })

  app.import('bower_components/jquery-ui/ui/core.js')
  app.import('bower_components/jquery-ui/ui/widget.js')
  app.import('bower_components/jquery-ui/ui/mouse.js')
  app.import('bower_components/jquery-ui/ui/slider.js')
  app.import('bower_components/jqueryuibootstrap/css/custom-theme/jquery-ui-1.10.3.custom.css')

  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',   { 'destDir': 'fonts' })
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',   { 'destDir': 'fonts' })
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',   { 'destDir': 'fonts' })
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',  { 'destDir': 'fonts' })
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', { 'destDir': 'fonts' })
  app.import('bower_components/bootstrap/js/transition.js')
  app.import('bower_components/bootstrap/js/tooltip.js')
  app.import('bower_components/bootstrap/js/dropdown.js')
  app.import('bower_components/bootstrap/js/collapse.js')
  app.import('bower_components/bootstrap/js/popover.js') // x-editable needs popover
  app.import('bower_components/bootstrap/js/modal.js')

  app.import('bower_components/moment-range/dist/moment-range.js')
  app.import('bower_components/moment-duration-format/lib/moment-duration-format.js')

  app.import('bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js')
  app.import('bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css')

  app.import('bower_components/bootstrap-daterangepicker/daterangepicker.js')
  app.import('bower_components/bootstrap-daterangepicker/daterangepicker-bs3.css')

  app.import('bower_components/vis/dist/vis.js', { 'exports': { 'vis': [ 'default' ] } })
  app.import('bower_components/vis/dist/vis.css')

  app.import('bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.js')
  app.import('bower_components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css')
  app.import('bower_components/x-editable/dist/bootstrap3-editable/img/clear.png',   { 'destDir': 'assets/img' })
  app.import('bower_components/x-editable/dist/bootstrap3-editable/img/loading.gif', { 'destDir': 'assets/img' })

  app.import('bower_components/nprogress/nprogress.js')
  app.import('bower_components/nprogress/nprogress.css')

  return app.toTree()
}
