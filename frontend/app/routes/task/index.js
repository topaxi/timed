import Ember            from 'ember'
import LoadingIndicator from 'timed/mixins/loading-indicator'

export default Ember.Route.extend(LoadingIndicator, {
  setupController(controller, ...args) {
    this._super(controller, ...args)

    controller.set('project', this.modelFor('project.edit'))
  }

, model() {
    let project = this.modelFor('project.edit')

    return project.get('tasks')
  }
})
