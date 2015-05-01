/* jshint ignore:start */
import Ember             from 'ember'
import Session           from 'simple-auth/session'
import AuthenticatorBase from 'simple-auth/authenticators/base'

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

let Authenticator = AuthenticatorBase.extend({
  async authenticate(credentials) {
    let { identification: username, password } = credentials

    let res = await Ember.$.ajax({
      url:         '/api/v1/login'
    , type:        'POST'
    , dataType:    'json'
    , contentType: 'application/json'
    , data:        JSON.stringify({ username, password })
    })

    if (res.error) {
      throw new Error(res.error.message)
    }

    return res
  }
, restore(data) {
    if (Ember.isEmpty(data.sessionId)) {
      throw new Error('No sessionId to restore found')
    }

    return data
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
