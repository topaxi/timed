import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'span'

, title: function() {
    return `${this.get('isFollowing') ? 'Unfollow' : 'Follow'} ${this.get('project.name')}`
  }.property('project.name', 'isFollowing')

, fixTooltip: function() {
    let tooltip = this.$('.tip')

    tooltip.prop('title', this.get('title'))
    tooltip.tooltip('fixTitle')

    if (tooltip.is(':hover')) {
      tooltip.tooltip('show')
    }
  }.observes('title')

, isFollowing: function() {
    let projects = this.get('session.user.projects')

    if (!projects) {
      return false
    }

    return projects.contains(this.get('project'))
  }.property('session.user.projects.@each')

, actions: {
    follow: function() {
      let user     = this.session.get('user')
      let projects = user.get('projects')
      let action   = this.get('isFollowing') ? 'removeObject' : 'addObject'

      projects[action](this.get('project'))
      user.then(user => user.save())
    }
  }
})
