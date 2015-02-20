import Ember                        from 'ember'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'
import { skip }                     from 'qunit'

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

skip('it renders', function(assert) {
  assert.expect(2)

  let assignment = store.createRecord('assignment')

  // creates the component instance
  var component = this.subject({ assignment })
  assert.equal(component._state, 'preRender')

  // appends the component to the page
  this.render()
  assert.equal(component._state, 'inDOM')
})
