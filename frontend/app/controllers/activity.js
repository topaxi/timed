import Ember from 'ember';

export default Ember.Controller.extend({
  // TODO: Implement user and team filter.
  'queryParams': [
    'from'
  , 'to'
  , { 'userId':     'user' }
  , { 'teamId':     'team' }
  , { 'projectId':  'project' }
  , { 'taskId':     'task' }
  , { 'customerId': 'customer' }
  ]

, 'taskId': []

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

, 'tasks': function(key, value) {
    if (arguments.length === 2) {
      return this.set('taskId', value.map(t => t.id))
    }

    let ids = this.get('taskId') || []

    if (!Array.isArray(ids)) {
      ids = [ ids ]
    }

    return ids.map(id => this.store.getById('task', id))
  }.property('taskId')

, 'updateTaskId': function() {
    return this.set('taskId', this.get('tasks').map(t => t.id))
  }.observes('tasks.@each')

, 'filteredActivities': function() {
    let activities = this.get('activities')

    if (this.get('customerId') && this.get('customerId') !== 'null') {
      activities = activities.filter(activity =>
        activity.get('task.project.customer.id') === this.get('customerId')
      )
    }

    let taskId = this.get('taskId')
    if (taskId && taskId !== 'null' && taskId.length) {
      activities = activities.filter(activity =>
        taskId.includes(activity.get('task.id'))
      )
    }
    else if (this.get('projectId') && this.get('projectId') !== 'null') {
      activities = activities.filter(activity =>
        activity.get('task.project.id') === this.get('projectId')
      )
    }

    return activities
  }.property('activities', 'projectId', 'taskId', 'taskId.@each', 'customerId')

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

, actions: {
    clearProject() {
      if (this.get('project.customer.id') !== this.get('customerId')) {
        this.set('projectId', null)
      }

      this.send('clearTasks')
    }

  , clearTasks() {
      this.set('taskId', null)
    }
  }
})
