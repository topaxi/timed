/* jshint ignore:start */
import Ember from 'ember'
import DS    from 'ember-data'
import Model from './model'

const { computed } = Ember
const { attr, belongsTo } = DS

export default Model.extend({
  name:     attr('string')
, project:  belongsTo('project', { async: true })
, duration: attr('number')
, from:     attr('moment')
, to:       attr('moment')
, priority: attr('number')
, done:     attr('boolean')

, async updateProgress() {
    let res = await fetch(`/api/v1/tasks/${this.id}/progress`, {
      credentials: 'same-origin'
    , headers: {
        Accept: 'application/json'
      }
    })

    if (res.ok && res.status !== 404) {
      this.set('progress', (await res.json()).progress)
    }
  }

, progress: computed({
    get() {
      this.updateProgress()

      return 0
    }
  })

, percent: computed('duration', 'progress', {
    get() {
      let duration = this.get('duration')

      if (!duration) {
        return 0
      }

      duration = duration * 1000 * 60 * 60

      return this.get('progress') / duration * 100
    }
  })
})
