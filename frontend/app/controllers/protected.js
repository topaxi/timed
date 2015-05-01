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
      this.store.pushPayload(await Ember.$.get('/api/v1/init/payload'))
    }
    catch (e) {
      this.notify.error(e.message)
    }
  }
})
