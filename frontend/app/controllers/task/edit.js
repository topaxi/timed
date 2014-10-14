import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  isNew: false
, actions: {
    submit: function() {
      this.model.save().then(() => {
        Notify.success('Task successfully saved!')

        this.transitionToRoute('task')
      })
      .catch(err =>
        Notify.error(err || 'Error while trying to save task!')
      )
    }
  }
})
