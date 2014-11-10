import Ember from 'ember';
import moment from 'moment';
import ProtectedRoute from './protected';

export default ProtectedRoute.extend({
  'setupController': function(controller) {
    controller.setProperties({
      'momentFrom': +moment().startOf('month')
    , 'momentTo':   +moment().endOf('month')
    , 'projects':   this.get('projects')
    , 'customers':  this.get('customers')
    })
  }
, 'beforeModel': function() {
    var projects  = this.store.find('project')
    var customers = this.store.find('customer')

    return new Ember.RSVP.all([ projects, customers ]).then(args => {
      this.set('projects',  args[0])
      this.set('customers', args[1])
    })
  }
})
