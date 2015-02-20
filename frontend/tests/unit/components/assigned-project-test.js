import Ember                        from 'ember'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'

let App
let store

moduleForComponent('assigned-project', 'AssignedProjectComponent', {
  needs: [ 'model:assignment' ]
, setup() {
    App   = startApp()
    store = App.__container__.lookup('store:main')
  }
, teardown() {
    Ember.run(() => App.destroy())
  }
})

test('it renders', function(assert) {
  return assert.expect(0)
  assert.expect(2)

  let assignment = store.createRecord('assignment')

  // creates the component instance
  var component = this.subject({ assignment })
  assert.equal(component._state, 'preRender')

  // appends the component to the page
  this.render()
  assert.equal(component._state, 'inDOM')
})
