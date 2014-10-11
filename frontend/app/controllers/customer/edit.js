import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  isNew: false
, actions: {
    submit: function() {
      this.model.save().then(function() {
        Notify.success('Customer successfully saved!')

        this.transitionToRoute('customer.edit', this.model)
      }.bind(this), function(err) {
        return Notify.error(err || 'Error while trying to save customer!')
      })
    }
  }
})
