import Ember from 'ember';

export default Ember.ObjectController.extend({
  isNew: false
, init: function() {
    this.set('customers', this.store.find('customer'))
  }
, actions: {
    submit: function() {
      this.model.save().then(() => {
        this.notify.success('Project successfully saved!')

        this.transitionToRoute('project.edit', this.model)
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to save project!')
      )
    }
  , delete: function() {
      this.model.deleteRecord()
      this.model.save().then(() => {
        this.notify.success('Project successfully deleted!')

        this.transitionToRoute('project')
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to delete project!')
      )
    }
  }
})
