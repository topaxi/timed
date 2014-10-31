import Ember from 'ember';

export default Ember.Component.extend({
  'tagName': 'table'
, 'classNames': [ 'table' ]
, 'tasks': function() {
    if (this.assignment.get('tasks.length')) {
      return this.assignment.get('tasks')
    }

    return this.assignment.store.find('task', {
      'project': this.assignment.get('project.id')
    })
  }.property('assignment.tasks.@each', 'assignment.project.tasks.@each')
})
