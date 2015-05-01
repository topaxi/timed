import Ember from 'ember'

export default Ember.Route.extend({
  rollback: function() {
    this.modelFor('project.edit').rollback()
  }.on('deactivate')
})
