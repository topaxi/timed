import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  'actions': {
    add(item) {
      let user = this.store.find('user', item.group)

      user.then(user => {
        let from       = moment(item.start).startOf('day')
        let to         = moment(from).add(1, 'day')
        let assignment = this.store.createRecord('assignment', { user, from, to })

        this.send('openModal', 'user/assignment', assignment)
      })
    }
  , update(item) {
      let assignment = this.store.find('assignment', item.id)

      assignment.then(assignment =>
        this.send('openModal', 'user/assignment', assignment)
      )
    }
  , move(item) {
      let assignment = this.store.find('assignment', item.id)
      let user       = this.store.find('user',       item.group)

      Ember.RSVP.all([ user, assignment ]).then(r => {
        let [ user, assignment ] = r

        assignment.set('from', moment(item.start))
        assignment.set('to',   moment(item.end))
        assignment.set('user', user)

        assignment.save()
      })
    }
  , remove(item, callback) {
      let assignment = this.store.find('assignment', item.id)

      assignment.then(assignment => {
        assignment.deleteRecord()
        assignment.save().then(() => callback(true))
      })
    }
  }
})
