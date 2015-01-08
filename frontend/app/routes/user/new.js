import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, user) {
    this.controllerFor('user.edit.edit').setProperties({ 'isNew': true, 'model': user })
  }
, model: function() {
    return this.store.createRecord('user')
  }
, renderTemplate: function() {
    this.render('user/edit/edit')
  }
, rollback: function() {
    this.controllerFor('user.edit.edit').get('model').rollback()
  }.on('deactivate')
})
