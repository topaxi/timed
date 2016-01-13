import Ember from 'ember'

export default Ember.Route.extend({
  setupController(controller, model) {
    this.controllerFor('task.edit').setProperties({
      isNew:  true
    , model
    , issues: []
    })
  }
, model() {
    let project = this.modelFor('project.edit')
    return this.store.createRecord('task', { project }, { project })
  }
, renderTemplate() {
    this.render('task/edit')
  }
, rollback: function() {
    this.controllerFor('task.edit').get('model').rollback()
  }.on('deactivate')
})
