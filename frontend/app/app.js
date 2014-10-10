import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import AuthBase from 'simple-auth/authenticators/base';
import Session from 'simple-auth/session';
import DS from 'ember-data';

Ember.MODEL_FACTORY_INJECTIONS = true

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
})

Session.reopen({
  user: function() {
    var userId = this.get('userId')

    if (userId) {
      return this.container.lookup('store:main').find('user', userId)
    }
  }.property('userId')
})

var Authenticator = AuthBase.extend({
  authenticate: function(credentials) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url: '/api/v1/login',
        type: 'POST',
        dataType: 'json',
        data: { 'username': credentials.identification
              , 'password': credentials.password
              }
      })
      .then(function(res) {
        Ember.run(function() {
          resolve({ accessToken: res.accessToken, userId: res.userId })
        });
      }, function(xhr) {
        Ember.run(function() { reject(xhr.responseText) })
      })
    })
  }
})

Ember.Application.initializer({
  name: 'authentication',
  before: 'simple-auth',
  initialize: function(container) {
    container.register('authenticator:custom', Authenticator)
  }
})

DS.RESTSerializer.reopen({ 'primaryKey': '_id' })
DS.RESTAdapter.reopen({ 'namespace': 'api/v1' })

loadInitializers(App, config.modulePrefix)

export default App
