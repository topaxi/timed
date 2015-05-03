/* jshint ignore:start */
import Ember    from 'ember'
import Notify   from 'ember-notify'
import moment   from 'moment'
import safehtml from 'timed/utils/safehtml'

const { computed } = Ember

export default Ember.Object.extend({

  url: computed({
    get() {
      let data = this.project.get('tracker.data')

      return `https://github.com/${data.repo}`
    }
  })

, logo: '/assets/tracker/github.png'

, async searchIssues(term = '') {
    let data = this.project.get('tracker.data')
    let q    = `${term} repo:${data.repo}`
    let res  = await fetch(`https://api.github.com/search/issues?q=${q}`, {
      headers: {
        'Authorization': `token ${data.apikey}`
      }
    })

    if (!res.ok) {
      let { message, documentation_url: url } = await res.json() // eslint-disable-line

      if (!Ember.$('#github-ratelimit').length) {
        Notify.error({
          raw:        `<a id="github-ratelimit" href="${url}">${message}</a>`
        , closeAfter: null
        })
      }

      return []
    }

    let { items } = await res.json()

    return items.map(this.mapIssueToSelectize)
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
      let url = safehtml`${data.raw.user.avatar_url}&s=40`

      avatar = safehtml`<div class="media-left">
        <img src="${url}" width="40" height="40">
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
