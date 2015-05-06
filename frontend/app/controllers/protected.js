/* jshint ignore:start */
import Ember from 'ember'

export default Ember.Controller.extend({
  socket: Ember.inject.service()

, init(...args) {
    this._super(...args)
    this.loadInitialData()
    this.connectSocket()
  }

, connectSocket() {
    this.get('socket')
  }

, async loadInitialData() {
    try {
      let res = await fetch('/api/v1/init/payload', {
        credentials: 'same-origin'
      , headers: {
          Accept: 'application/json'
        }
      })

      if (res.ok && res.status !== 404) {
        this.store.pushPayload(await res.json())
      }
    }
    catch (e) {
      this.notify.error(e.message)
    }
  }
})
