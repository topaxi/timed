import Ember from 'ember'
import io    from 'socket.io'

export default Ember.Service.extend({
  store: Ember.inject.service()

, init: function() {
    let connection = io()

    this.set('connection', connection)

    connection.on('model', data => this.get('store').pushPayload(data))
    connection.on('unload model', (type, id) => {
      let model = this.get('store').getById(type, id)

      if (model) {
        model.unloadRecord()
        model.destroy()
      }
    })
  }
})
