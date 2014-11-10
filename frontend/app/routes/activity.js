import Ember from 'ember';
import moment from 'moment';
import ProtectedRoute from './protected';

export default ProtectedRoute.extend({
  'queryParams': {
    'from': { 'refreshModel': true, 'replace': true }
  , 'to':   { 'refreshModel': true, 'replace': true }
  , 'user': { 'refreshModel': true, 'replace': true }
  }

, 'setupController': function(controller, model) {
    controller.setProperties({
      'momentFrom': +moment().startOf('month')
    , 'momentTo':   +moment().endOf('month')
    , 'projects':   this.get('projects')
    , 'customers':  this.get('customers')
    , 'model':      model
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

, 'model': function({ from, to, user }) {
    return this.store.find('attendance',  { from, to, user })
  }

, 'afterModel': function(model) {
    return Ember.RSVP.all(model.reduce((promises, attendance) => {
      attendance.get('activities').forEach(activity =>
        promises.push(activity.get('task'))
      )

      return promises
    }, []))
  }
})
