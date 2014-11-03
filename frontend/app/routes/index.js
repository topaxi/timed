import Ember from 'ember';
import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  model: function() {
    return this.session.get('user')
  }
, afterModel: function() {
    var user        = this.get('session.user.id')
    var assignments = this.store.find('assignment', { user })
    var attendances = this.store.find('attendance', { user })

    return Ember.RSVP.all([ assignments, attendances ])
  }
})
