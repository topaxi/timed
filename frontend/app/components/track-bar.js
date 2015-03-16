import Ember    from 'ember'
import safehtml from 'timed/utils/safehtml'

export default Ember.Component.extend({
  elementId:  'track-bar'
, classNames: 'container'

, activity: Ember.computed.alias('user.currentActivity')
, task:     Ember.computed.alias('activity.task')
, project:  null

, selectedTask: null

, init(...args) {
    this._super(...args)

    this.store = this.container.lookup('store:main')
  }

, projects: function() {
    return this.store.find('project')
  }.property()

, projectOption: function({ data: project }) {
    return safehtml`<div class="option">
      <div>${project.get('name')}</div>
      <div>${project.get('customer.name')}</div>
    </div>`
  }

, actions: {
    startNewActivity() {
      this.get('user').then(user =>
        user.startActivity().save()
      )
    }
  , setProject(value) {
      this.set('project', value)
    }
  , setActivityComment(value) {
      let activity = this.get('activity')

      activity.set('comment', value)
      activity.save()
    }
  , selectTask(value) {
      // Destructing ember-selectize while calling an action
      // throws errors, delay setting task a bit
      Ember.run.next(() => {
        this.set('project', null)
        this.set('task',    value)
        this.get('activity').save()
      })
    }
  }
})
