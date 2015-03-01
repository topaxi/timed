import Ember                        from 'ember'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'

let App
let store

moduleForComponent('assigned-project', 'AssignedProjectComponent', {
  needs: [
    'model:assignment'
  , 'component:track-task'
  , 'component:task-progressbar'
  ]
, beforeEach() {
    App   = startApp()
    store = App.__container__.lookup('store:main')
  }
, afterEach() {
    Ember.run(() => App.destroy())
  }
})

test('it renders', function(assert) {
  assert.expect(2)

  Ember.run(() => {
    let assignment = store.createRecord('assignment')
    let component  = this.subject({ assignment })

    assert.equal(component._state, 'preRender')

    this.render()
    assert.equal(component._state, 'inDOM')
  })
})

test('it lists project assignments', function(assert) {
  assert.expect(1)

  function createTasks(project) {
    return [
      store.createRecord('task', { project, name: 'Task 1' })
    , store.createRecord('task', { project, name: 'Task 2', done: true })
    , store.createRecord('task', { project, name: 'Task 3' })
    , store.createRecord('task', { project, name: 'Task 4' })
    ]
  }

  Ember.run(() => {
    let project    = store.createRecord('project', { id: 5 })
    let tasks      = createTasks(project)
    let assignment = store.createRecord('assignment', { project })
    let component  = this.subject({ assignment })

    this.render()

    assert.equal(component.$('.assigned-project-task').length, 3)
  })
})

test('it lists directly assigned tasks', function(assert) {
  assert.expect(1)

  function createTasks(project) {
    return [
      store.createRecord('task', { project, name: 'Task 1' })
    , store.createRecord('task', { project, name: 'Task 2', done: true })
    , store.createRecord('task', { project, name: 'Task 3' })
    , store.createRecord('task', { project, name: 'Task 4' })
    ]
  }

  Ember.run(() => {
    let project    = store.createRecord('project', { id: 5 })
    let tasks      = createTasks(project)
    let assignment = store.createRecord('assignment', { project })
    let component  = this.subject({ assignment })

    assignment.get('tasks.content').addObjects(tasks.slice(1, 3))

    this.render()

    assert.equal(component.$('.assigned-project-task').length, 1)
  })
})
