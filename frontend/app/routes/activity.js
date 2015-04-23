import Ember  from 'ember'
import moment from 'moment'

export default Ember.Route.extend({
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
    let projects  = this.store.find('project')
    let customers = this.store.find('customer')
    let users     = this.store.find('user')

    return Ember.RSVP.all([ projects, customers, users ]).then(args => {
      this.set('projects',  args[0])
      this.set('customers', args[1])
      this.set('users',     args[2])
    })
  }

, 'model': function({ from, to, user }) {
    return this.store.find('attendance', { from, to, user })
  }

, 'afterModel': function(model) {
    let promises = model.reduce((promises, attendance) => {
      attendance.get('activities').forEach(activity =>
        promises.push(activity.get('task'))
      )

      return promises
    }, [])

    return Ember.RSVP.all(promises)
  }
})
