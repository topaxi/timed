import Ember  from 'ember'
import DS     from 'ember-data'
import Notify from 'ember-notify'

export default DS.RESTAdapter.extend({
  'namespace': 'api/v1'
, 'coalesceFindRequests': true
, 'socket': Ember.inject.service()
, 'headers': function() {
    return {
      'X-Timed-Current-Socket': this.get('socket.connection.id') || ''
    }
  }.property().volatile()
, 'ajaxError': function(xhr) {
    let error

    try {
      error = JSON.parse(xhr.responseText)
    }
    catch (e) {
      error = xhr.responseText
    }

    Notify.error(error)
  }
})
