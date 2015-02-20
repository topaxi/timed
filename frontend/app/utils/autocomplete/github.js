import Ember    from 'ember'
import moment   from 'moment'
/* jshint ignore:start */
import safehtml from 'timed/utils/safehtml'
/* jshint ignore:end */

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

/* No support for tagged templates in jshint :/ */
/* jshint ignore:start */
, selectizeOptionTemplate(option) {
    let avatar = ''

    if (option.data.type !== 'github') {
      return safehtml`<div class="option">${option.label}</div>`.safehtml
    }

    if (option.data.raw.user.avatar_url) {
      avatar = safehtml`<div class="media-left">
        <img src="${option.data.raw.user.avatar_url}&s=40" width="40" height="40">
      </div>`
    }

    let html = safehtml`<div class="option media">
      ${avatar}
      <div class="media-body">
        <div>
          <small><strong>Author</strong>: ${option.data.raw.user.login}</small>
          <small><strong>Created</strong>: ${option.data.created.format('YYYY-MM-DD')}</small>
          <small><strong>Updated</strong>: ${option.data.updated.format('YYYY-MM-DD')}</small>
        </div>
        <div><strong>${option.label}</strong></div>
      </div>
    </div>`

    return html.safehtml
  }
/* jshint ignore:end */
})
