import Ember from 'ember'

export default Ember.Object.extend({

  issues: null

  // Redmine API does not allow to search for issues...
  // See: http://www.redmine.org/issues/6277
, searchIssues(term = '') {
    if (this.get('issues')) {
      return this.get('issues')
    }

    let data = this.project.get('tracker.data')

    this.set('issues', Ember.$.ajax({
      url: `${data.url}/issues.json`
    , data: {
        'project_id': data.projectId
      , 'limit': 100 // Maximum limit is 100
      }
    , headers: {
        'X-Redmine-API-Key': data.apikey
      }
    })
    .then(res => res.issues.map(i => i.subject)))
  }
})
