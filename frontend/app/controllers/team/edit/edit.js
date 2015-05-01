/* jshint ignore:start */
import Ember from 'ember'

export default Ember.Controller.extend({
  isNew: false

, init() {
    this.set('allUsers', this.store.find('user'))
  }

, actions: {
    async submit() {
      try {
        await this.model.save()
        this.notify.success('Team successfully saved!')

        this.transitionToRoute('team.edit', this.model)
      }
      catch (err) {
        this.notify.error(err || 'Error while trying to save team!')
      }
    }

  , async delete() {
      try {
        this.model.deleteRecord()
        await this.model.save()
        this.notify.success('Project successfully team!')

        this.transitionToRoute('team')
      }
      catch (err) {
        this.notify.error(err || 'Error while trying to delete team!')
      }
    }
  }
})
