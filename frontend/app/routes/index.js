import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  model: function() {
    return this.session.get('user')
  }
, afterModel: function() {
    return this.store.find('assignment', {
      'user': this.get('session.user.id')
    })
  }
})
