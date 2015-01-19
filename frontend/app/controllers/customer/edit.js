import Ember from 'ember';

export default Ember.ObjectController.extend({
  isNew: false
, actions: {
    submit: function() {
      this.model.save().then(() => {
        this.notify.success('Customer successfully saved!')

        this.transitionToRoute('customer.edit', this.model)
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to save customer!')
      )
    }
  , delete: function() {
      this.model.deleteRecord()
      this.model.save().then(() => {
        this.notify.success('Customer successfully deleted!')

        this.transitionToRoute('customer')
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to delete customer!')
      )
    }
  }
})
