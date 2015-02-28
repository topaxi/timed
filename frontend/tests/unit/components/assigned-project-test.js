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

  let assignment
  let component

  Ember.run(() => {
    assignment = store.createRecord('assignment')
    component  = this.subject({ assignment })
  })

  andThen(() => {
    // creates the component instance
    assert.equal(component._state, 'preRender')

    // appends the component to the page
    this.render()
    assert.equal(component._state, 'inDOM')
  })
})
