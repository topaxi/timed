import Ember from 'ember'

const { computed, observer } = Ember

export default Ember.Component.extend({
  tagName: 'span'

, activity: computed.alias('session.user.currentActivity')

, title: computed('task.name', 'isTracking', {
    get() {
      let trackingLabel = this.get('isTracking') ? 'Stop tracking' : 'Track'
      let taskName      = this.get('task.name') || ''

      return `${trackingLabel} ${taskName}`.trim()
    }
  })

, fixTooltip: observer('title', function() {
    let tooltip = this.$('.tip')

    tooltip.prop('title', this.get('title'))
    tooltip.tooltip('fixTitle')

    if (tooltip.is(':hover')) {
      tooltip.tooltip('show')
    }
  })

, isCurrentTask() {
    return this.get('activity.task.id') === this.get('task.id')
  }

, isTracking: computed('task.id', 'activity.to', {
    get() {
      if (this.isCurrentTask()) {
        let to = this.get('activity.to')

        return to && !to.isValid()
      }

      return false
    }
  })

, glyphicon: computed('isTracking', {
    get() {
      let isTracking = this.get('isTracking')
      let icon

      if (isTracking) {
        icon = 'record'
      }
      else if (this.isCurrentTask()) {
        icon = 'repeat'
      }
      else {
        icon = 'play'
      }

      return `glyphicon-${icon}`
    }
  })

, actions: {
    track() {
      let user     = this.get('session.user')
      let activity = this.get('isTracking') ?
        user.endCurrentActivity() :
        user.startActivity(this.get('task'))

      activity.save()
    }
  }
})
