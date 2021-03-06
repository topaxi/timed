/* jshint ignore:start */
import Ember             from 'ember'
import Session           from 'simple-auth/session'
import AuthenticatorBase from 'simple-auth/authenticators/base'

const { computed } = Ember

Session.reopen({
  user: computed('userId', {
    async get() {
      let userId = this.get('userId')

      if (userId) {
        let store = this.container.lookup('store:main')

        let user = await store.find('user', userId)

        this.set('user', user)

        return user
      }
    }
  })
})

let Authenticator = AuthenticatorBase.extend({
  async authenticate(credentials) {
    let { identification: username, password } = credentials

    let response = await fetch('/api/v1/login', {
      method:      'post'
    , credentials: 'same-origin'
    , headers: {
        'Accept':       'application/json'
      , 'Content-Type': 'application/json'
      }
    , body: JSON.stringify({ username, password })
    })

    let json = await response.json()

    if (!response.ok) {
      throw new Error(json.message)
    }

    return json
  }
, async restore(data) {
    if (Ember.isEmpty(data.sessionId)) {
      throw new Error('No sessionId to restore found')
    }

    return data
  }
, invalidate() {
    return fetch('/api/v1/logout', { method: 'post', credentials: 'same-origin' })
  }
})

export default {
  name: 'session'
, before: 'simple-auth'
, initialize(container) {
    container.register('authenticator:custom', Authenticator)
  }
}
