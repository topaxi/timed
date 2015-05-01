/* jshint ignore:start */
import Ember             from 'ember'
import Session           from 'simple-auth/session'
import AuthenticatorBase from 'simple-auth/authenticators/base'
import AuthorizerBase    from 'simple-auth/authorizers/base'

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

    let response = await fetch('/api/v1/login', {
      method: 'post'
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
    return fetch('/api/v1/logout', { method: 'post' })
  }
})

let Authorizer = AuthorizerBase.extend({
  authorize(xhr, request) {
    xhr.setRequestHeader('X-Timed-Session-Id')
  }
})

export default {
  name: 'session'
, before: 'simple-auth'
, initialize(container) {
    container.register('authorizer:custom',    Authorizer)
    container.register('authenticator:custom', Authenticator)
  }
}
