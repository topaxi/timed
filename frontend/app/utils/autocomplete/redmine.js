import Ember from 'ember'

const LIMIT = 100 // Maximum limit is 100

export default Ember.Object.extend({

  issues: null

, searchIssues(term = '') {
    if (this.get('issues')) {
      return this.get('issues')
    }

    this.set('issues', this._fetch().then(issues => issues.map(i => i.subject)))
  }

  // Redmine API does not allow to search for issues.
  // For now, we fetch all issues for a project...
  // See: http://www.redmine.org/issues/6277
, _fetch(offset = 0, issues = []) {
    let data = this.project.get('tracker.data')

    return Ember.$.ajax({
      url: `${data.url}/issues.json`
    , data: {
        'project_id': data.projectId
      , 'limit':      LIMIT
      , offset
      }
    , dataType: data.datatype
    , headers: {
        'X-Redmine-API-Key': data.apikey
      }
    })
    .then(res => {
      issues.push.apply(issues, res.issues)

      return res
    })
    .then(res => {
      if (res.total_count > res.offset + res.limit) {
        return this._fetch(res.offset + res.limit, issues)
      }

      return issues
    })
  }
})
