import Ember    from 'ember'
import moment   from 'moment'
import safehtml from 'timed/utils/safehtml'

const LIMIT = 100 // Maximum limit is 100

export default Ember.Object.extend({

  issues: null

, url: function() {
    let data = this.project.get('tracker.data')

    return `${data.url}/projects/${data.projectId}`
  }.property()

, logo: function() {
    return '/assets/tracker/redmine.png'
  }.property()

, searchIssues(/*term = ''*/) {
    if (this.get('issues')) {
      return this.get('issues')
    }

    this.set('issues', this._fetch().then(issues =>
      issues.map(i => this.mapIssueToSelectize(i))
    ))
  }

, mapIssueToSelectize(data) {
    return {
      id:      data.id
    , type:    'redmine'
    , label:   data.subject
    , value:   data.subject
    , created: moment(data.created_on)
    , updated: moment(data.updated_on)
    , raw:     data
    }
  }

, selectizeOptionTemplate(option) {
    if (option.data.type !== 'redmine') {
      return safehtml`<div class="option">${option.label}</div>`
    }

    let html = safehtml`<div class="option">
      <div><strong>${option.label}</strong></div>
      <div>
        <small class="nowrap"><strong>Author</strong>: ${option.data.raw.author.name}</small>
        <small class="nowrap"><strong>Created</strong>: ${option.data.created.format('YYYY-MM-DD')}</small>
        <small class="nowrap"><strong>Updated</strong>: ${option.data.updated.format('YYYY-MM-DD')}</small>
      </div>
    </div>`

    return html
  }

  // Redmine API does not allow to search for issues.
  // For now, we fetch all issues for a project...
  // See: http://www.redmine.org/issues/6277
, _fetch(offset = 0, issues = []) {
    let data = this.project.get('tracker.data')
    let req = {
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
    }

    if (data.datatype === 'jsonp') {
      req.data.key = data.apikey
    }

    return Ember.$.ajax(req).then(res => {
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
