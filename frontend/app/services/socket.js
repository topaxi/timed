import Ember  from 'ember'
import Notify from 'ember-notify'
import io     from 'socket.io'

export default Ember.Service.extend({
  store: Ember.inject.service()

, init: function() {
    let connection = io()

    this.set('connection', connection)

    connection.on('backend version', notifyVersion)
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

function notifyVersion(version) {
  if (!Ember.$('.ember-notify-cn').length) {
    return Ember.run.later(() => notifyVersion(version), 1000)
  }

  let app = Ember.libraries._registry.find(lib => lib.name === 'Timed')

  if (app.version !== version && !Ember.$('#reload-application').length) {
    Notify.warning({
      raw: `<a id="reload-application" href="javascript:window.location.reload()">
        A new Timed version is available, please reload now.
      </a>`
    , closeAfter: null
    })
  }
}
