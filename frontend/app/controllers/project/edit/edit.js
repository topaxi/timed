import Ember from 'ember'

const { computed } = Ember

export default Ember.Controller.extend({
  isNew: false
, trackers: [ 'github', 'redmine' ]

, init() {
    this.set('customers', this.store.find('customer'))
    this.set('users',     this.store.find('user'))
  }

, trackerPartial: computed('model.tracker.type', {
    get() {
      let type = this.get('model.tracker.type')

      return type ? `project/edit/${type}` : null
    }
  })

, actions: {
    submit() {
      this.model.save().then(() => {
        this.notify.success('Project successfully saved!')

        this.transitionToRoute('project.edit', this.model)
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to save project!')
      )
    }
  , delete() {
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
