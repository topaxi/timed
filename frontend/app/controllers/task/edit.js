import Ember from 'ember';

export default Ember.Controller.extend({
  isNew: false

, issues:         null
, fetchingIssues: false

, actions: {
    submit() {
      this.model.save().then(() => {
        this.notify.success('Task successfully saved!')

        this.transitionToRoute('task')
      })
      .catch(err =>
        this.notify.error(err || 'Error while trying to save task!')
      )
    }

  , delete() {
      this.model.deleteRecord()
      this.send('submit')
    }

  , createTaskName(name) {
      this.set('issues', [ { label: name, value: name, data: name } ])
      this.set('model.name', name)
    }

  , fetchIssues(filter) {
      this.set('fetchingIssues', true)
      this.get('model.project').then(project =>
        project.searchIssues(filter)
      )
      .then(issues =>
        this.set('issues', issues)
      )
      .catch(e => {
        this.set('issues', [])

        console.error(e)
      })
      .finally(() =>
        this.set('fetchingIssues', false)
      )
    }
  }
})
