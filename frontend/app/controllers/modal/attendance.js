import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  'dateFormat': 'L LT'

, 'createAttendance': function() {
    var model = this.get('model')

    if (moment.isMoment(model)) {
      this.set('model', this.store.createRecord('attendance', {
        'from': moment(model).startOf('day')
      , 'user': this.container.lookup('simple-auth-session:main').get('user')
      }))
    }
  }.observes('model')

, 'from': function() {
    var from = this.get('model.from')

    return from && from.format(this.dateFormat)
  }.property('model.from')

, 'to': function() {
    var to = this.get('model.to')

    return to && to.format(this.dateFormat)
  }.property('model.to')

, 'actions': {
    'save': function() {
      var attendance = this.get('model')

      attendance.set('from', moment(this.get('from'), this.dateFormat))
      attendance.set('to',   moment(this.get('to'),   this.dateFormat))

      attendance.save()
    }

  , 'delete': function() {
      this.get('model').destroyRecord()
    }
  }
})
