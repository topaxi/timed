import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model)

    controller.set('issues', [])
  }

, rollback: function() {
    this.modelFor('task.edit').rollback()
  }.on('deactivate')
})
