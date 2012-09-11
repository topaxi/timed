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

require(['backbone', 'models/user', 'views/timeline', 'bootstrap'],
    function(Backbone, ModelUser, Timeline) {
  'use strict'

  var user     = Timed.user = new ModelUser
    , timeline = new Timeline({ 'model': user })

  user.on('update', function() {
    //timeline.render()
  })

  $.getJSON('/user/current', function(data) {
    if (data.error) return alert(data.error.message)

    user.set(data)
    user.trigger('update')
  })

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
})
