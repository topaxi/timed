import Ember from 'ember';
import Notify from 'ember-notify';

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
    let projects = this.session.get('user.projects')

    if (!projects) {
      return false
    }

    return projects.contains(this.get('project'))
  }.property('session.user.projects.@each')
, actions: {
    follow: function() {
      let user     = this.session.get('user')
        , projects = user.get('projects')

      if (!projects) {
        Notify.error('Something went wrong!')
      }

      let action = this.get('isFollowing') ? 'removeObject' : 'addObject'

      // TODO: For some reason, if we remove either projects[action](project)
      //       call, the project won't get stored in the user.
      projects[action](this.get('project'))
      user.then(user =>
        user.get('projects').then(projects => {
          projects[action](this.get('project'))
          user.save()
        })
      )
    }
  }
})
