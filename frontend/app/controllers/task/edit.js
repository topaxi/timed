import Ember from 'ember';

export default Ember.Controller.extend({
  isNew: false

, issues:      null
, issueFilter: null

, fetchIssues: function() {
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
  }.observes('issueFilter')

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
