import Ember from 'ember';

export default Ember.ObjectController.extend({
  isNew: false
, actions: {
    submit: function() {
      this.model.save().then(() => {
        this.notify.success('Task successfully saved!')

        this.transitionToRoute('task')
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to save task!')
      )
    }
  , delete: function() {
      this.model.deleteRecord()
      this.send('submit')
    }
  }
})
