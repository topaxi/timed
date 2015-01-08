import Ember from 'ember';

export default Ember.Route.extend({
  'setupController': function(controller, team) {
    this.controllerFor('team.edit.edit').setProperties({
      'isNew': true
    , 'model': team
    })
  }
, 'model': function() {
    return this.store.createRecord('team')
  }
, 'renderTemplate': function() {
    this.render('team/edit/edit')
  }
, 'rollback': function() {
    this.controllerFor('team.edit.edit').get('model').rollback()
  }.on('deactivate')
})
