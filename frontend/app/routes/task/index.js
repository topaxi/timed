import Ember from 'ember'

export default Ember.Route.extend({
  setupController(controller, ...args) {
    this._super(controller, ...args)

    controller.set('project', this.modelFor('project.edit'))
  }

, model() {
    let project = this.modelFor('project.edit')

    return project.get('tasks')
  }
})
