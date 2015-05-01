import Ember  from 'ember'
import config from './config/environment'

let Router = Ember.Router.extend({ 'location': config.locationType })

Router.reopen({
  hideMobileMenu: function() {
    let $collapse  = Ember.$('#navbar').find('.navbar-collapse')
    let isExpanded = () => $collapse.attr('aria-expanded') === 'true'

    if (isExpanded()) {
      Ember.run.scheduleOnce('afterRender', () => $collapse.collapse('hide'))
    }
  }.on('didTransition')
})

Router.map(function() {
  this.route('login')
  this.route('about')

  this.route('protected', { 'path': '/' }, function() {
    this.resource('index', { 'path': '/' })

    this.resource('project', function() {
      this.route('new')
      this.route('edit', { 'path': '/:project_id' }, function() {
        this.route('edit', { 'path': '/' })
        this.resource('task', function() {
          this.route('new')
          this.route('edit', { 'path': '/:task_id' })
        })
      })
    })

    this.resource('customer', function() {
      this.route('new')
      this.route('edit', { 'path': '/:customer_id' })
    })

    this.resource('team', function() {
      this.route('new')
      this.route('edit', { 'path': '/:team_id' }, function() {
        this.route('edit', { 'path': '/' })
        this.route('manage')
      })
    })

    this.resource('user', function() {
      this.route('new')
      this.route('edit', { 'path': '/:user_id' }, function() {
        this.route('edit', { 'path': '/' })
        this.route('worktime')
      })
    })

    this.resource('activity')
  })

  this.route('not-found', { 'path': '/*path' })
})

export default Router
