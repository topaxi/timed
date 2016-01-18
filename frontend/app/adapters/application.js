import Ember  from 'ember'
import DS     from 'ember-data'
import Notify from 'ember-notify'

const { computed, inject } = Ember

export default DS.RESTAdapter.extend({
  namespace:            'api/v1'
, coalesceFindRequests: true
, socket:               inject.service()

, headers: computed({
    get() {
      return {
        'X-Timed-Current-Socket': this.get('socket.connection.id') || ''
      }
    }
  }).volatile()

, ajaxError(xhr) {
    let error

    try {
      error = JSON.parse(xhr.responseText)
    }
    catch (e) {
      error = xhr.responseText
    }

    Notify.error(error)
  }

, pathForType(type) {
    return Ember.String.dasherize(this._super(type))
  }
})
