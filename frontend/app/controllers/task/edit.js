import Ember from 'ember'
import moment from 'moment'

export default Ember.Controller.extend({
  isNew: false

, issues:           null
, fetchingIssues:   false
, selectizePlugins: [ 'restore_on_backspace' ]

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

    , setTaskData(issue) {
      if (issue && issue.type === 'redmine') {
        if (issue.raw.estimated_hours) {
          this.model.set('duration', issue.raw.estimated_hours)
        }

        if (issue.raw.start_date) {
          this.model.set('from', moment(issue.raw.start_date, 'YYYY-MM-DD'))
        }

        if (issue.raw.due_date) {
          this.model.set('to', moment(issue.raw.due_date, 'YYYY-MM-DD'))
        }
      }
    }
  }
})
