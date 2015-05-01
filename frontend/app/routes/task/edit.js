import Ember from 'ember'

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model)

    let name         = model.get('name')
    let defaultIssue = { label: name, value: name, data: name }

    controller.set('issues', [ defaultIssue ])
  }

, rollback: function() {
    this.modelFor('task.edit').rollback()
  }.on('deactivate')
})
