import DS from 'ember-data';
import Notify from 'ember-notify';

export default DS.RESTAdapter.extend({
  'namespace': 'api/v1'
, 'coalesceFindRequests': true
, 'ajaxError': function(xhr) {
    var error

    try {
      error = JSON.parse(xhr.responseText)
    }
    catch (e) {
      error = xhr.responseText
    }

    console.log(error, xhr)
    Notify.error(error)
  }
})
