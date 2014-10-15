import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Component.extend({
  init: function() {
    this._super()
    this.session = this.container.lookup('simple-auth-session:main')
  }
, isFollowing: function() {
    var user     = this.session.get('user')
      , projects = user.get('projects')

    if (!projects) {
      return false
    }

    return user.get('projects').contains(this.get('project'))
  }.property('session.user.projects.@each')
, actions: {
    follow: function(project) {
      var user     = this.session.get('user')
        , projects = user.get('projects')

      if (!projects) {
        Notify.error('Something went wrong!')
      }

      var action = this.get('isFollowing') ? 'removeObject' : 'addObject'

      // TODO: For some reason, if we remove either projects[action](project)
      //       call, the project won't get stored in the user.
      projects[action](project)
      user.then(user => {
        user.get('projects').then(projects => {
          projects[action](project)
          user.save()
        })
      })
    }
  }
})
