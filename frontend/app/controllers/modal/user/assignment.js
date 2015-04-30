import Ember from 'ember'

const { computed } = Ember

export default Ember.Controller.extend({
  init() {
    this.set('allTasks',    this.store.find('task'))
    this.set('allProjects', this.store.find('project'))
  }

, title: computed('model.user', {
    get() {
      let action = this.get('model.isNew') ? 'Add' : 'Edit'
      let name   = this.get('model.user.longName')

      return `${action} assignment for ${name}`
    }
  })

, actions: {
    save() {
      this.get('model').save()
    }

  , closeModal() {
      this.get('model').rollback()

      return true
    }
  }
})
