import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  isNew: false
, actions: {
    submit: function() {
      this.model.save().then(() => {
        Notify.success('Customer successfully saved!')

        this.transitionToRoute('customer.edit', this.model)
      })
      .catch(err =>
        Notify.error(err || 'Error while trying to save customer!')
      )
    }
  , delete: function() {
      this.model.deleteRecord()
      this.model.save().then(() => {
        Notify.success('Customer successfully deleted!')

        this.transitionToRoute('customer')
      })
      .catch(err =>
        Notify.error(err || 'Error while trying to delete customer!')
      )
    }
  }
})
