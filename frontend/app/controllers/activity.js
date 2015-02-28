import Ember from 'ember';

export default Ember.Controller.extend({
  // TODO: Implement user and team filter.
  'queryParams': [
    'from'
  , 'to'
  , { 'userId':     'user'     }
  , { 'teamId':     'team'     }
  , { 'projectId':  'project'  }
  , { 'taskId':     'task'     }
  , { 'customerId': 'customer' }
  ]

, 'project': function() {
    let projectId = this.get('projectId')

    // TODO: How does this happen?
    if (projectId === 'null') {
      projectId = null
    }

    return projectId && this.store.find('project', projectId)
  }.property('projectId')

, 'updateDateFilter': function() {
    this.set('from', +this.get('momentFrom'))
    this.set('to',   +this.get('momentTo'))
  }.observes('momentFrom', 'momentTo')

, 'activities': function() {
    let activities = []

    this.get('model').forEach(attendance =>
      attendance.get('activities').forEach(
        activity => activities.push(activity)
      )
    )

    return activities
  }.property('model.@each')

, 'filteredActivities': function() {
    let activities = this.get('activities')

    if (this.get('customerId')) {
      activities = activities.filter(activity =>
        activity.get('task.project.customer.id') === this.get('customerId')
      )
    }

    if (this.get('taskId')) {
      activities = activities.filter(activity =>
        activity.get('task.id') === this.get('taskId')
      )
    }
    else if (this.get('projectId')) {
      activities = activities.filter(activity =>
        activity.get('task.project.id') === this.get('projectId')
      )
    }

    return activities
  }.property('activities', 'projectId', 'taskId', 'customerId')

, 'filteredProjects': function() {
    let customerId = this.get('customerId')
    let projects   = this.get('projects')

    if (customerId) {
      return projects.filter(project =>
        project.get('customer.id') === customerId
      )
    }

    return projects
  }.property('projects', 'customerId')
})
