import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  deactivate: function() {
    this.controllerFor('customer.edit').model.rollback()
  }
})
