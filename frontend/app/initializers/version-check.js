import Ember  from 'ember'
import Notify from 'ember-notify'

export function initialize(container, application) {
  Ember.$(window).focus(checkUpdate)

  Ember.run.later(checkUpdate, 2000)

  function checkUpdate() {
    Ember.$.get('/api/v1/whoami', res => {
      if (application.version !== res.version && !Ember.$('#reload-application').length) {
        Notify.warning({
          raw: `<a id="reload-application" href="javascript:window.location.reload()">
            A new Timed version is available, please reload now.
          </a>`
        , closeAfter: null
        })
      }
    })
  }
}

export default {
  name:  'version-check'
, after: 'authentication'
, initialize
}
