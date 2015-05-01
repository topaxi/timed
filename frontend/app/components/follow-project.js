import Ember from 'ember'

const { computed, observer } = Ember

export default Ember.Component.extend({
  tagName: 'span'
, classNames: [ 'dib' ]

, title: computed('project.name', 'isFollowing', {
    get() {
      return `${this.get('isFollowing') ? 'Unfollow' : 'Follow'} ${this.get('project.name')}`
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

, isFollowing: computed('session.user.projects.@each', {
    get() {
      let projects = this.get('session.user.projects')

      if (!projects) {
        return false
      }

      return projects.contains(this.get('project'))
    }
  })

, actions: {
    follow() {
      let user     = this.session.get('user')
      let projects = user.get('projects')
      let action   = this.get('isFollowing') ? 'removeObject' : 'addObject'

      projects[action](this.get('project'))
      user.save()
    }
  }
})
