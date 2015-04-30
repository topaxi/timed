import Ember    from 'ember'
import Session  from 'simple-auth/session'
import AuthBase from 'simple-auth/authenticators/base'

const { computed } = Ember

Session.reopen({
  user: computed('userId', {
    get() {
      let userId = this.get('userId')

      if (userId) {
        let store = this.container.lookup('store:main')

        return store.find('user', userId).then(user =>
          this.set('user', user)
        )
      }
    }
  })
})

let Authenticator = AuthBase.extend({
  authenticate(credentials) {
    let { identification: username, password } = credentials

    return new Ember.RSVP.Promise((resolve, reject) =>
      Ember.$.ajax({
        url:         '/api/v1/login'
      , type:        'POST'
      , dataType:    'json'
      , contentType: 'application/json'
      , data:        JSON.stringify({ username, password })
      })
      .then(resolve)
      .fail(xhr => {
        let error

        try {
          error = JSON.parse(xhr.responseText)
        }
        catch (e) {
          error = xhr.responseText
        }

        reject(error)
      })
    )
  }
, restore(data) {
    if (Ember.isEmpty(data.sessionId)) {
      return Ember.RSVP.reject()
    }

    return Ember.RSVP.resolve(data)
  }
, invalidate() {
    return Ember.$.post('/api/v1/logout')
  }
})

export default {
  name: 'session'
, before: 'simple-auth'
, initialize(container) {
    container.register('authenticator:custom', Authenticator)
  }
}
