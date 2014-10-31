import Ember from 'ember';
import moment from 'moment';

export default Ember.ObjectController.extend({
  'actions': {
    add(item) {
      var user = this.store.find('user', item.group)

      user.then(user => {
        var from       = moment(item.start).startOf('day')
        var to         = moment(from).add(1, 'day')
        var assignment = this.store.createRecord('assignment', { user, from, to })

        this.send('openModal', 'user/assignment', assignment)
      })
    }
  , update(item) {
      var assignment = this.store.find('assignment', item.id)

      assignment.then(assignment =>
        this.send('openModal', 'user/assignment', assignment)
      )
    }
  , move(item) {
      var assignment = this.store.find('assignment', item.id)
      var user       = this.store.find('user',       item.group)

      Ember.RSVP.all([ user, assignment ]).then(r => {
        var [ user, assignment ] = r

        assignment.set('from', moment(item.start))
        assignment.set('to',   moment(item.end))
        assignment.set('user', user)

        assignment.save()
      })
    }
  , remove(item, callback) {
      var assignment = this.store.find('assignment', item.id)

      assignment.then(assignment => {
        assignment.deleteRecord()
        assignment.save().then(() => callback(true))
      })
    }
  }
})
