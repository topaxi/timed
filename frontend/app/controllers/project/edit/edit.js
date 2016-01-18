/* jshint ignore:start */
import Ember from 'ember'

const { computed } = Ember

export default Ember.Controller.extend({
  isNew: false
, trackers: [ 'github', 'redmine' ]
, selectedTaskTemplates: []

, init() {
    this.set('customers',     this.store.find('customer'))
    this.set('users',         this.store.find('user'))
    this.set('taskTemplates', this.store.find('task-template'))
  }

, trackerPartial: computed('model.tracker.type', {
    get() {
      let type = this.get('model.tracker.type')

      return type ? `project/edit/${type}` : null
    }
  })

, actions: {
    async submit() {
      try {
        let result = await this.model.save()

        this.get('selectedTaskTemplates').forEach(template => {
          this.store.createRecord('task', {
            name: template.get('name')
          , project: result
          }).save()
        })

        this.notify.success('Project successfully saved!')

        this.transitionToRoute('project.edit', this.model)
      }
      catch (err) {
        this.notify.error(err || 'Error while trying to save project!')
      }
    }
  , async delete() {
      try {
        this.model.deleteRecord()
        await this.model.save()
        this.notify.success('Project successfully deleted!')

        this.transitionToRoute('project')
      }
      catch (err) {
        this.notify.error(err || 'Error while trying to delete project!')
      }
    }

  , toggleTaskTemplate(taskTemplate) {
      let selectedTaskTemplates = this.get('selectedTaskTemplates')

      if (selectedTaskTemplates.contains(taskTemplate)) {
        selectedTaskTemplates.removeObject(taskTemplate)
      }
      else {
        selectedTaskTemplates.pushObject(taskTemplate)
      }

      this.set('selectedTaskTemplates', selectedTaskTemplates)
    }
  }
})
