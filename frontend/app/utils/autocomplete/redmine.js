import Ember    from 'ember'
import moment   from 'moment'
import safehtml from 'timed/utils/safehtml'

const LIMIT = 100 // Maximum limit is 100
const { computed } = Ember

export default Ember.Object.extend({

  issues: null

, url: computed({
    get() {
      let data = this.project.get('tracker.data')

      return `${data.url}/projects/${data.projectId}`
    }
  })

, logo: '/assets/tracker/redmine.png'

, searchIssues(/*term = ''*/) {
    if (this.get('issues')) {
      return this.get('issues')
    }

    this.set('issues', this._fetch().then(issues =>
      issues.map(i => this.mapIssueToSelectize(i))
    ))
  }

, mapIssueToSelectize(data) {
    let subject = `${data.tracker.name}: ${data.subject}`

    return {
      id:      data.id
    , type:    'redmine'
    , label:   subject
    , value:   subject
    , created: moment(data.created_on)
    , updated: moment(data.updated_on)
    , raw:     data
    }
  }

, selectizeOptionTemplate({ label, data }) {
    if (data.type !== 'redmine') {
      return safehtml`<div class="option">${label}</div>`
    }

    let html = safehtml`<div class="option">
      <div><strong>${data.raw.tracker.name}</strong>: ${data.raw.subject}</div>
      <div>
        <small class="nowrap"><strong>Author</strong>: ${data.raw.author.name}</small>
        <small class="nowrap"><strong>Created</strong>: ${data.created.format('YYYY-MM-DD')}</small>
        <small class="nowrap"><strong>Updated</strong>: ${data.updated.format('YYYY-MM-DD')}</small>
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
