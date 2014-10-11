import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  actions: {
    submit: function() {
      this.model.save(function(err) {
        if (err) return Notify.error(err)

        Notify.ok('User successfully saved!')
      })
    }
  }
})
