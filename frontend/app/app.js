import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import AuthBase from 'simple-auth/authenticators/base';
import Session from 'simple-auth/session';
import DS from 'ember-data';

Ember.MODEL_FACTORY_INJECTIONS = true

var App = Ember.Application.extend({
  modulePrefix:    config.modulePrefix
, podModulePrefix: config.podModulePrefix
, Resolver:        Resolver
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
        url:      '/api/v1/login'
      , type:     'POST'
      , dataType: 'json'
      , data:     { 'username': credentials.identification
                  , 'password': credentials.password
                  }
      })
      .then(function(res) {
        Ember.run(function() { resolve(res) })
      }, function(xhr) {
        Ember.run(function() {
          var error

          try {
            error = JSON.parse(xhr.responseText)
          }
          catch (e) {
            error = xhr.responseText
          }

          reject(error)
        })
      })
    })
  }
})

Ember.Application.initializer({
  name: 'authentication-before-simple-auth'
, before: 'simple-auth'
, initialize: function(container) {
    container.register('authenticator:custom', Authenticator)
  }
})

Ember.Application.initializer({
  name: 'authentication'
, after: 'simple-auth'
, initialize: function(container) {
    var session = container.lookup('simple-auth-session:main')

    session.on('sessionAuthenticationFailed', function(err) {
      // TODO: Shiny error message.
      alert(err ? err.message : 'Authentication error!')
    })
  }
})

DS.RESTSerializer.reopen({ 'primaryKey': '_id' })
DS.RESTAdapter.reopen({ 'namespace': 'api/v1' })

loadInitializers(App, config.modulePrefix)

export default App
