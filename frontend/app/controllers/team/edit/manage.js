/* jshint ignore:start */
import Ember from 'ember'
import moment from 'moment'

export default Ember.Controller.extend({
  actions: {
    async add(item) {
      let user = await this.store.find('user', item.group)

      let from       = moment(item.start).startOf('day')
      let to         = moment(from).add(1, 'day')
      let assignment = this.store.createRecord('assignment', { user, from, to })

      this.send('openModal', 'user/assignment', assignment)
    }
  , async update(item) {
      let assignment = await this.store.find('assignment', item.id)

      this.send('openModal', 'user/assignment', assignment)
    }
  , async move(item) {
      let assignment = this.store.find('assignment', item.id)
      let user       = this.store.find('user',       item.group)

      ;[ user, assignment ] = await Ember.RSVP.all([ user, assignment ])

      assignment.set('from', moment(item.start))
      assignment.set('to',   moment(item.end))
      assignment.set('user', user)

      assignment.save()
    }
  , async remove(item, callback) {
      let assignment = await this.store.find('assignment', item.id)

      assignment.deleteRecord()
      await assignment.save()
      callback(true)
    }
  }
})
