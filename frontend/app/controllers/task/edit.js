import Ember from 'ember';

export default Ember.Controller.extend({
  isNew: false

, issues:         null
, issueFilter:    null
, fetchingIssues: false

, fetchIssues: function() {
    this.set('fetchingIssues', true)
    this.get('model.project').then(project =>
      project.searchIssues(this.get('issueFilter'))
    )
    .then(issues =>
      this.set('issues', issues)
    )
    .catch(e => {
      this.set('issues', [])

      console.error(e)
    })
    .finally(() => {
      let issues    = this.get('issues')
      let modelName = this.get('model.name')

      // Make sure our existing modelName is in the resultset
      if (modelName && issues.indexOf(modelName) > -1) {
        issues.unshift(modelName)
      }

      this.set('fetchingIssues', false)
    })
  }.observes('issueFilter')

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
      // TODO: This seems hackish, find out how we can use selectize
      //       as a proper autocomplete.
      this.set('issues', [ name ])
      this.set('model.name', name)
    }
  }
})
