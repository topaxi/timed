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

, loadInitialData() {
    Ember.$.get('/api/v1/init/payload')
      .then(data => this.store.pushPayload(data))
  }
})
