import Ember from 'ember';
import moment from 'moment';

export default Ember.ObjectController.extend({
  dateFormat: 'YYYY-MM-DD hh:mm'
, init: function() {
    this.set('tasks', this.store.find('task'))
  }
, createActivityForAttendance: function() {
    if (this.get('model.activities')) {
      this.set('model', this.store.createRecord('activity', {
        'attendance': this.get('model')
      }))
    }
  }.observes('model')
, from: function() {
    var from = this.get('model.from')

    return from && from.format(this.dateFormat)
  }.property('model.from')
, to: function() {
    var to = this.get('model.to')

    return to && to.format(this.dateFormat)
  }.property('model.to')
, actions: {
    save: function() {
      var activity = this.get('model')

      activity.set('from', moment(this.get('from'), this.dateFormat))
      activity.set('to',   moment(this.get('to'),   this.dateFormat))

      activity.get('attendance.user').save()
    }
  , closeModal: function() {
      this.get('model').rollback()

      return true
    }
  }
})
