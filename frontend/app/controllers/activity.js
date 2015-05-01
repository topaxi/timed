import Ember from 'ember'

const { computed, observer } = Ember

export default Ember.Controller.extend({
  // TODO: Implement user and team filter.
  queryParams: [
    'from'
  , 'to'
  , { userId:     'user' }
  , { teamId:     'team' }
  , { projectId:  'project' }
  , { taskId:     'task' }
  , { customerId: 'customer' }
  ]

, taskId: []

, project: computed('projectId', {
    get() {
      let projectId = this.get('projectId')

      // TODO: How does this happen?
      if (projectId === 'null') {
        projectId = null
      }

      return projectId && this.store.find('project', projectId)
    }
  })

, updateDateFilter: observer('momentFrom', 'momentTo', function() {
    this.set('from', +this.get('momentFrom'))
    this.set('to',   +this.get('momentTo'))
  })

, activities: computed('model.@each', {
    get() {
      let activities = []

      this.get('model').forEach(attendance =>
        attendance.get('activities').forEach(
          activity => activities.push(activity)
        )
      )

      return activities
    }
  })

, tasks: computed('taskId', {
    set(key, newValue/*, oldValue*/) {
      return this.set('taskId', newValue.map(t => t.id))
    }
  , get() {
      let ids = this.get('taskId') || []

      if (!Array.isArray(ids)) {
        ids = [ ids ]
      }

      return ids.map(id => this.store.getById('task', id))
    }
  })

, updateTaskId: computed('tasks.@each', function() {
    return this.set('taskId', this.get('tasks').map(t => t.id))
  })

, filteredActivities: computed('activities', 'projectId', 'taskId', 'taskId.@each', 'customerId', {
    get() {
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
    }
  })

, filteredProjects: computed('projects', 'customerId', {
    get() {
      let customerId = this.get('customerId')
      let projects   = this.get('projects')

      if (customerId) {
        return projects.filter(project =>
          project.get('customer.id') === customerId
        )
      }

      return projects
    }
  })

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
