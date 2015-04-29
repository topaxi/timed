import Ember from 'ember'

export default Ember.Route.extend({
  model() {
    let project = this.modelFor('project.edit')

    return this.store.find('task', { 'project': project.id }, { project })
  }
})
