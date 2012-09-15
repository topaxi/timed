require.config({
    paths: { 'md5':        '/js/lib/crypto/md5'
           , 'underscore': '/js/lib/underscore/underscore'
           , 'backbone':   '/js/lib/backbone/backbone'
//           , 'superagent': '/js/lib/superagent.min'
           , 'jquery':     [ '//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery'
                           , '/js/lib/jquery/jquery'
                           ]
           , 'bootstrap':  '/bootstrap/js/bootstrap'
           }
  , shim: { 'superagent': { exports: 'superagent' }
          , 'backbone':   { exports: 'Backbone', deps: [ 'underscore', 'jquery' ] }
          , 'md5':        { exports: 'CryptoJS.MD5' }
          , 'underscore': { exports: '_' }
          , 'bootstrap':  { deps: [ 'jquery' ] }
          }
})

Timed.formatDate = function(date) {
  date = Timed.parseDate(date)

  return [ Timed.pad(date.getDate(), 2)
         , Timed.pad(date.getMonth() + 1, 2)
         , date.getFullYear()
         ].join('.')
}

Timed.formatTime = function(date) {
  date = Timed.parseDate(date)

  return [ Timed.pad(date.getHours(), 2)
         , Timed.pad(date.getMinutes(), 2)
         ].join(':')
}

Timed.formatDateTime = function(date) {
  return Timed.formatDate(date) +' '+ Timed.formatTime(date)
}

Timed.parseDate = function(date) {
  //if (!date) throw new Error('Cannot parse falsy value as Date')
  if (!date) date = 0

  if (typeof date == 'object') return date
  if (typeof date == 'number') return new Date(date)

  return new Date(Date.parse(date))
}

Timed.pad = function pad(n, d, p) {
  for (n = ''+ (n >>> 0); n.length < d;) n = (p || '0')+ n; return n
}

require(['backbone', 'models/user', 'views/timeline', 'views/trackbar', 'bootstrap'],
    function(Backbone, ModelUser, Timeline, Trackbar) {
  'use strict'

  var user     = Timed.user = new ModelUser
    , timeline = new Timeline({ 'model': user })
    , trackbar = new Trackbar({ 'model': user })

  user.url = '/user/current'
  user.on('update', function() {
    //timeline.render()
    trackbar.render()
  })
  user.fetch({ 'success': function() {
    user.url = '/user/'+ user.get('_id')
    user.trigger('update')

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
})
