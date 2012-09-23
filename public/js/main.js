require.config({
    paths: { 'md5':        'lib/crypto/md5'
           , 'underscore': 'lib/underscore/underscore'
           , 'backbone':   'lib/backbone/backbone'
           , 'moment':     'lib/moment/moment'
//           , 'superagent': 'lib/superagent.min'
           , 'jquery':     [ '//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery'
                           , 'lib/jquery/jquery'
                           ]
           , 'bootstrap':  '../bootstrap/js/bootstrap'
           }
  , shim: { 'superagent': { exports: 'superagent' }
          , 'backbone':   { exports: 'Backbone', deps: [ 'underscore', 'jquery' ] }
          , 'md5':        { exports: 'CryptoJS.MD5' }
          , 'underscore': { exports: '_' }
          , 'bootstrap':  { deps: [ 'jquery' ] }
          }
})

require(['moment'], function(moment) {
  // https://github.com/timrwood/moment/pull/444
  moment.fn.toJSON = function() {
    return this._d.toJSON()
  }
})

require(['models/user', 'views/timeline', 'views/trackbar', 'views/dashboard', 'bootstrap'],
    function(ModelUser, Timeline, Trackbar, Dashboard) {
  'use strict'

  var user      = Timed.user = new ModelUser
    , timeline  = new Timeline ({ 'model': user })
    , trackbar  = new Trackbar ({ 'model': user })

  user.url = '/user/current'
  user.on('change', function() {
    //timeline .render()
    trackbar .render()
  })
  user.fetch({ 'success': function() {
    user.url = '/user/'+ user.get('_id')

    setInterval(function() { trackbar.render() }, 5000)
  } })

  // TODO: Menu should be done shinier and with less duplicate code

  !function() {
    var dialog, customers

    $('#customers').click(function(e) {
      e.preventDefault()

      if (dialog) {
        customers.fetch({ 'success': function() { dialog.render() } })

        return
      }

      require(['collections/customer', 'views/customer/list'],
          function(Customers, CustomerList) {
        customers = new Customers
        dialog    = new CustomerList({ 'model': customers })
        customers.fetch({ 'success': function() { dialog.render() } })
      })
    })
  }()

  !function() {
    var dialog, projects

    $('#projects').click(function(e) {
      e.preventDefault()

      if (dialog) {
        projects.fetch({ 'success': function() { dialog.render() } })

        return
      }

      require(['collections/project', 'views/project/list'],
          function(Projects, ProjectList) {
        projects = new Projects
        dialog   = new ProjectList({ 'model': projects })
        projects.fetch({ 'success': function() { dialog.render() } })
      })
    })
  }()

  !function() {
    var dialog, users

    $('#users').click(function(e) {
      e.preventDefault()

      if (dialog) {
        users.fetch({ 'success': function() { dialog.render() } })

        return
      }

      require(['collections/user', 'views/user/list'],
          function(Users, UserList) {
        users  = new Users
        dialog = new UserList({ 'model': users })
        users.fetch({ 'success': function() { dialog.render() } })
      })
    })
  }()

  // TODO: Implement some kind of router, Backbone.Router?
  // init dashboard
  document.getElementById('dashboard') && function() {
    require(['collections/project', 'views/dashboard'], function(Projects, Dashboard) {
      var projects  = new Projects
        , dashboard = new Dashboard

      projects.user = Timed.user
      dashboard.projects = projects

      Timed.user.on('change', fetchProjects)

      fetchProjects()

      function fetchProjects() {
        if (Timed.user.get('projects').length) {
          projects.fetch({ 'success': function() {
            dashboard.render()
          } })
        }
        else {
          projects.reset([])
          dashboard.render()
        }
      }
    })
  }()
})
