import ProtectedRoute from 'timed/routes/protected';
import moment from 'moment';

export default ProtectedRoute.extend({
  init: function() {
    this.set('currentDay', moment.utc().startOf('day'))
  }
, attendances: function() {
    return this.get('model').getAttendancesByDay(this.get('currentDay'))
  }.property('currentDay', 'model.attendances.@each')
, model: function() {
    return this.session.get('user')
  }
})
