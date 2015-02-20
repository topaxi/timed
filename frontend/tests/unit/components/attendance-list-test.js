import Ember                        from 'ember'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'

let App
let store

moduleForComponent('attendance-list', 'AttendanceListComponent', {
  needs: [ 'component:date-picker', 'model:user' ]
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

  let user = store.createRecord('user')

  // creates the component instance
  var component = this.subject({ user })
  assert.equal(component._state, 'preRender')

  // appends the component to the page
  this.render()
  assert.equal(component._state, 'inDOM')
})
