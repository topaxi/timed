import Ember from 'ember';
import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  model: function() {
    return this.session.get('user')
  }
, afterModel: function() {
    let user        = this.get('model.id')
    let assignments = this.store.find('assignment', { user })
    let attendances = this.store.find('attendance', { user })

    return Ember.RSVP.all([ assignments, attendances ])
  }
})
