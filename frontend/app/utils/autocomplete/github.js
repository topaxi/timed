import Ember    from 'ember'
import moment   from 'moment'
import safehtml from 'timed/utils/safehtml'

export default Ember.Object.extend({

  searchIssues(term = '') {
    let data = this.project.get('tracker.data')
    let q    = `${term} repo:${data.repo}`

    return Ember.$.ajax({
      url: 'https://api.github.com/search/issues'
    , data: { q }
    , headers: {
        'Authorization': `token ${data.apikey}`
      }
    }).then(res => res.items.map(i => this.mapIssueToSelectize(i)))
  }

, mapIssueToSelectize(data) {
    return {
      id:      data.id
    , type:    'github'
    , label:   data.title
    , value:   data.title
    , created: moment(data.created_at)
    , updated: moment(data.updated_at)
    , raw:     data
    }
  }

, selectizeOptionTemplate({ label, data }) {
    let avatar = ''

    if (data.type !== 'github') {
      return safehtml`<div class="option">${label}</div>`
    }

    if (data.raw.user.avatar_url) {
      avatar = safehtml`<div class="media-left">
        <img src="${data.raw.user.avatar_url}&s=40" width="40" height="40">
      </div>`
    }

    let html = safehtml`<div class="option media">
      ${avatar}
      <div class="media-body">
        <div><strong>${label}</strong></div>
        <div>
          <small class="nowrap">
            <strong>Author</strong>: ${data.raw.user.login}
          </small>
          <small class="nowrap">
            <strong>Created</strong>: ${data.created.format('YYYY-MM-DD')}
          </small>
          <small class="nowrap">
            <strong>Updated</strong>: ${data.updated.format('YYYY-MM-DD')}
          </small>
        </div>
      </div>
    </div>`

    return html
  }
})
