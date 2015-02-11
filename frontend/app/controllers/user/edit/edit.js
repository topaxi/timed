import Ember from 'ember';

export default Ember.Controller.extend({
  isNew: false
, actions: {
    submit: function() {
      this.model.save().then(() => {
        this.notify.success('User successfully saved!')

        this.transitionToRoute('user.edit', this.model)
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to save user!')
      )
    }
  , delete: function() {
      this.model.deleteRecord()
      this.model.save().then(() => {
        this.notify.success('User successfully deleted!')

        this.transitionToRoute('user')
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to delete user!')
      )
    }
  }
})
