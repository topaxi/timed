import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  deactivate: function() {
    this.controllerFor('user.edit').model.rollback()
  }
})
