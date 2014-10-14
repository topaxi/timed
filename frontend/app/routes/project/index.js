import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  model: function() {
    return this.store.find('project')
  }
})
