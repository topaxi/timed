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
