import Ember from 'ember';

export default Ember.Route.extend({
  deactivate: function() {
    this.modelFor('project.edit').rollback()
  }
})
