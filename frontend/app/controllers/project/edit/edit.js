import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  isNew: false
, init: function() {
    this.set('customers', this.store.find('customer'))
  }
, actions: {
    submit: function() {
      this.model.save().then(() => {
        Notify.success('Project successfully saved!')

        this.transitionToRoute('project.edit', this.model)
      })
      .catch(err =>
        Notify.error(err || 'Error while trying to save project!')
      )
    }
  }
})
