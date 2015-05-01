/* jshint ignore:start */
import Ember from 'ember'

export default Ember.Controller.extend({
  isNew: false
, actions: {
    async submit() {
      try {
        await this.model.save()
        this.notify.success('User successfully saved!')

        this.transitionToRoute('user.edit', this.model)
      }
      catch (err) {
        this.notify.error(err || 'Error while trying to save user!')
      }
    }
  , async delete() {
      try {
        this.model.deleteRecord()
        await this.model.save()
        this.notify.success('User successfully deleted!')

        this.transitionToRoute('user')
      }
      catch (err) {
        this.notify.error(err || 'Error while trying to delete user!')
      }
    }
  }
})
