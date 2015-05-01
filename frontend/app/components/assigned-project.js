import Ember from 'ember'

const { computed } = Ember

export default Ember.Component.extend({
  tagName: 'table'
, classNames: [ 'table' ]

, assignedTasks: computed('assignment.tasks.@each', 'assignment.project.tasks.@each', {
    get() {
      let tasks       = this.assignment.get('tasks')
      let tasksLength = this.assignment.get('tasks.length')

      if (!tasksLength) {
        tasks = this.assignment.get('project.tasks')
      }

      return tasks
    }
  })

, tasks: computed('assignedTasks', 'assignedTasks.@each.isDone', {
    get() {
      let tasks = this.get('assignedTasks') || []

      return tasks.filter(t => !t.get('done'))
    }
  })
})
