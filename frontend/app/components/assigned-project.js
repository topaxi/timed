import Ember from 'ember';

export default Ember.Component.extend({
  'tagName': 'table'
, 'classNames': [ 'table' ]

, 'assignedTasks': function() {
    if (this.assignment.get('tasks.length')) {
      return this.assignment.get('tasks')
    }

    return this.assignment.get('project.tasks')
  }.property('assignment.tasks.@each', 'assignment.project.tasks.@each')

, 'tasks': function() {
    let tasks = this.get('assignedTasks') || []

    return tasks.filter(t => !t.get('done'))
  }.property('assignedTasks', 'assignedTasks.@each.isDone')
})
