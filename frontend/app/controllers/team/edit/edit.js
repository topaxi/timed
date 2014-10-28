import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  isNew: false
, init: function() {
    this.set('allUsers', this.store.find('user'))
  }
, actions: {
    submit: function() {
      this.model.save().then(() => {
        Notify.success('Team successfully saved!')

        this.transitionToRoute('team.edit', this.model)
      })
      .catch(err =>
        Notify.error(err || 'Error while trying to save team!')
      )
    }
  , delete: function() {
      this.model.deleteRecord()
      this.model.save().then(() => {
        Notify.success('Project successfully team!')

        this.transitionToRoute('team')
      })
      .catch(err =>
        Notify.error(err || 'Error while trying to delete team!')
      )
    }
  }
})
