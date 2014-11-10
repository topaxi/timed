import Ember from 'ember';

export default Ember.Controller.extend({
  // TODO: Implement user and team filter.
  queryParams: [ 'from', 'to', 'user', 'team', 'project', 'customer' ]

, updateDateFilter: function() {
    this.set('from', +this.get('momentFrom'))
    this.set('to',   +this.get('momentTo'))
  }.observes('momentFrom', 'momentTo')

, activities: function() {
    var activities = []

    this.get('model').forEach(attendance => {
      attendance.get('activities').forEach(activity => activities.push(activity))
    })

    return activities
  }.property('model.@each')

, filteredActivities: function() {
    var activities = this.get('activities')

    if (this.get('customer')) {
      activities = activities.filter(activity =>
        activity.get('task.project.customer.id') === this.get('customer')
      )
    }

    if (this.get('project')) {
      activities = activities.filter(activity =>
        activity.get('task.project.id') === this.get('project')
      )
    }

    return activities
  }.property('activities', 'project', 'customer')

, filteredProjects: function() {
    var customerId = this.get('customer')
    var projects   = this.get('projects')

    if (customerId) {
      return projects.filter(project => project.get('customer.id') === customerId)
    }

    return projects
  }.property('projects', 'customer')
})
