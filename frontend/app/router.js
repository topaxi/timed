import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function() {
  this.route('login')

  this.resource('user', function() {
    this.route('edit', { 'path': '/:user_id' })
  })

  this.route('about')
})

export default Router
