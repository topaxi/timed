import DS from 'ember-data';
import Notify from 'ember-notify';

export default DS.RESTAdapter.extend({
  'namespace': 'api/v1'
, 'coalesceFindRequests': true
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
