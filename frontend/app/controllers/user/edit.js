import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  actions: {
    submit: function() {
      this.model.save().then(function() {
        Notify.success('User successfully saved!')
      }, function(err) {
        return Notify.error(err || 'Error while trying to save user!')
      })
    }
  }
})
