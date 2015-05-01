/* jshint ignore:start */
import Ember from 'ember'

export default Ember.Controller.extend({
  isNew: false
, actions: {
    async submit() {
      try {
        await this.model.save()

        this.notify.success('Customer successfully saved!')

        this.transitionToRoute('customer.edit', this.model)
      }
      catch (err) {
        this.notify.error(err || 'Error while trying to save customer!')
      }
    }
  , async delete() {
      try {
        this.model.deleteRecord()
        await this.model.save()
        this.notify.success('Customer successfully deleted!')

        this.transitionToRoute('customer')
      }
      catch (err) {
        this.notify.error(err || 'Error while trying to delete customer!')
      }
    }
  }
})
