import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  setupController: function() {
    var user = this.store.createRecord('user')

    this.controllerFor('user.edit').setProperties({ 'isNew': true, 'model': user })
  }
, renderTemplate: function() {
    this.render('user/edit')
  }
, deactivate: function() {
    this.controllerFor('user.edit').model.rollback()
  }
})
