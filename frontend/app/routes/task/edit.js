import Ember from 'ember';

export default Ember.Route.extend({
  deactivate: function() {
    this.modelFor('task.edit').rollback()
  }
})
