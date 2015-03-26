import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('task', { 'project': this.modelFor('project.edit').id })
    // TODO: Somehow, ember does not make requests through getter, fetching tasks through
    //       the store for now...
    // return this.modelFor('project.edit').get('tasks')
  }
})
