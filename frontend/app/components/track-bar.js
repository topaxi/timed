import Ember    from 'ember'
import safehtml from 'timed/utils/safehtml'

const { computed, run } = Ember

export default Ember.Component.extend({
  elementId:  'track-bar'
, classNames: 'container track-bar'

, activity: computed.alias('user.currentActivity')
, task:     computed.alias('activity.task')
, project:  null

, selectedTask: null

, init(...args) {
    this._super(...args)

    this.store = this.container.lookup('store:main')
  }

, projects: computed({
    get() {
      return this.store.find('project')
    }
  })

, projectOption({ data: project }) {
    return safehtml`<div class="option">
      <div>${project.get('name')}</div>
      <div><small>${project.get('customer.name')}</small></div>
    </div>`
  }

, actions: {
    startNewActivity() {
      this.get('user').startActivity().save()
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
      run.next(() => {
        this.set('project', null)
        this.set('task',    value)
        this.get('activity').save()
      })
    }
  }
})
