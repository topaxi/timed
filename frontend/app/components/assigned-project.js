import Ember from 'ember';

export default Ember.Component.extend({
  'tagName': 'table'
, 'classNames': [ 'table' ]

, 'assignedTasks': function() {
    if (this.assignment.get('tasks.length')) {
      return this.assignment.get('tasks')
    }

    return this.assignment.store.find('task', {
      'project': this.assignment.get('project.id')
    , 'done':    false
    })
  }.property('assignment.tasks.@each', 'assignment.project.tasks.@each')

, 'tasks': function() {
    return this.get('assignedTasks').filter(t => !t.get('done'))
  }.property('assignedTasks', 'assignedTasks.@each.isDone')
})
