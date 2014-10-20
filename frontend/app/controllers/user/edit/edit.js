import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  isNew: false
, actions: {
    submit: function() {
      this.model.save().then(() => {
        Notify.success('User successfully saved!')

        this.transitionToRoute('user.edit', this.model)
      })
      .catch(err =>
        Notify.error(err || 'Error while trying to save user!')
      )
    }
  , delete: function() {
      this.model.deleteRecord()
      this.model.save().then(() => {
        Notify.success('User successfully deleted!')

        this.transitionToRoute('user')
      })
      .catch(err =>
        Notify.error(err || 'Error while trying to delete user!')
      )
    }
  }
})
