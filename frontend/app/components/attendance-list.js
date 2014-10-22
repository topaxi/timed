import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  currentDay: null
, init: function() {
    this.set('currentDay', moment().startOf('day'))
  }
, attendances: function() {
    return this.get('user').getAttendancesByDay(this.get('currentDay'))
  }.property('currentDay', 'user.attendances.@each')
})
