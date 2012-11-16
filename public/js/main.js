require.config({
    paths: { 'md5':        'lib/crypto/md5'
           , 'underscore': 'lib/underscore/underscore'
           , 'backbone':   'lib/backbone/backbone'
           , 'moment':     'lib/moment/moment'
//           , 'superagent': 'lib/superagent.min'
           , 'jquery':     [ '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery'
                           , 'lib/jquery/jquery'
                           ]
           , 'jqueryui':   'http://code.jquery.com/ui/1.9.1/jquery-ui'
           , 'bootstrap':  '../bootstrap/js/bootstrap'
           , 'datepicker': '../bootstrap-datepicker/js/bootstrap-datepicker'
           , 'daterangepicker': '../bootstrap-daterangepicker/daterangepicker'
           }
  , shim: { 'superagent': { exports: 'superagent' }
          , 'backbone':   { exports: 'Backbone', deps: [ 'underscore', 'jquery' ] }
          , 'md5':        { exports: 'CryptoJS.MD5' }
          , 'underscore': { exports: '_' }
          , 'bootstrap':  { deps: [ 'jquery' ] }
          }
})

require(['moment'], function(moment) {
  'use strict';

  // https://github.com/timrwood/moment/pull/444
  moment.fn.toJSON = function() {
    return this._d.toJSON()
  }
})

Timed.stylesheets = {
    'jqueryui':        '/css/jqueryui/jquery-ui-1.8.16.custom'
  , 'datepicker':      '/bootstrap-datepicker/css/datepicker'
  , 'daterangepicker': '/bootstrap-daterangepicker/daterangepicker'
}
Timed.addStylesheet = function(name) {
  'use strict';

  var rel = 'stylesheet'
    , id  = name +'-'+ rel

  if (document.getElementById(id)) return

  var link = document.createElement('link')

  link.id   = id
  link.rel  = rel
  link.href = Timed.stylesheets[name] +'.css'

  document.head.appendChild(link)
}

require([
  'models/user'
, 'collections/task'
, 'collections/project'
, 'collections/customer'
, 'views/timeline'
, 'views/trackbar'
, 'views/dashboard'
, 'bootstrap'
], function(
  User
, Tasks
, Projects
, Customers
, Timeline
, Trackbar
, Dashboard
) {
  'use strict';

  var user      = Timed.user      = new User(Timed.user)
    , tasks     = Timed.tasks     = new Tasks(Timed.tasks)
    , projects  = Timed.projects  = new Projects(Timed.projects)
    , customers = Timed.customers = new Customers(Timed.customers)
    , timeline  = new Timeline({ 'model': user })
    , trackbar  = new Trackbar({ 'model': user })

  user.on('change', function() {
    trackbar.render()
    timeline.render()
  })
  trackbar.render()
  timeline.render()
  setInterval(function() { trackbar.render() }, 5000)
  setInterval(function() { timeline.render() }, 1000 * 60)

  // TODO: Menu should be done shinier and with less duplicate code

  ;(function() {
    var dialog

    $('#customers').click(function(e) {
      e.preventDefault()

      if (dialog) {
        customers.fetch({ 'success': function() { dialog.render() } })

        return
      }

      require(['views/customer/list'], function(CustomerList) {
        dialog    = new CustomerList({ 'model': customers })
        customers.fetch({ 'success': function() { dialog.render() } })
      })
    })
  })()

  ;(function() {
    var dialog

    $('#projects').click(function(e) {
      e.preventDefault()

      if (dialog) {
        projects.fetch({ 'success': function() { dialog.render() } })

        return
      }

      require(['views/project/list'], function(ProjectList) {
        dialog   = new ProjectList({ 'model': projects })
        projects.fetch({ 'success': function() { dialog.render() } })
      })
    })
  })()

  ;(function() {
    var dialog, users

    $('#users').click(function(e) {
      e.preventDefault()

      if (dialog) {
        users.fetch({ 'success': function() { dialog.render() } })

        return
      }

      require(['collections/user', 'views/user/list'],
          function(Users, UserList) {
        users = new Users
        dialog = new UserList({ 'model': users })
        users.fetch({ 'success': function() { dialog.render() } })
      })
    })
  })()

  // TODO: Implement some kind of router, Backbone.Router?
  // init dashboard
  document.getElementById('dashboard') && (function() {
    require(['views/dashboard'], function(Dashboard) {
      var dashboard = new Dashboard

      Timed.user.on('change', function() {
        dashboard.render()
      })
      Timed.tasks.on('all', function() {
        dashboard.render()
      })
      dashboard.render()
    })
  })()
})
