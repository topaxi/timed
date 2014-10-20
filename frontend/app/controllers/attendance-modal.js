import Ember from 'ember';
import moment from 'moment';

export default Ember.ObjectController.extend({
  dateFormat: 'YYYY-MM-DD hh:mm'
, from: function() {
    return this.get('model.from').format(this.dateFormat)
  }.property('model.from')
, to: function() {
    return this.get('model.to').format(this.dateFormat)
  }.property('model.to')
, updateAttendance: function() {
    var attendance = this.get('model')

    attendance.set('from', moment.utc(this.get('from'), this.dateFormat))
    attendance.set('to',   moment.utc(this.get('to'),   this.dateFormat))
  }.observes('from', 'to')
, actions: {
    save: function() {
      this.get('model.user').save()
    }
  , closeModal: function() {
      this.get('model').rollback()

      return true
    }
  }
})
