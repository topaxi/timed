import Ember from 'ember';
import Session from 'simple-auth/session';
import AuthBase from 'simple-auth/authenticators/base';

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
, restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.sessionId)) {
        resolve(data)
      }
      else {
        reject()
      }
    })
  }
})

export default {
  name: 'session'
, before: 'simple-auth'
, initialize: function(container) {
    container.register('authenticator:custom', Authenticator)
  }
}
