import Ember                        from 'ember'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'

let App
// let store

moduleForComponent('track-attendance', 'TrackAttendanceComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  setup() {
    App   = startApp()
    // store = App.__container__.lookup('store:main')
  }
, teardown() {
    Ember.run(() => App.destroy())
  }
})

test('it renders', function(assert) {
  assert.expect(2)

  // creates the component instance
  let component = this.subject()
  assert.equal(component._state, 'preRender')

  // appends the component to the page
  this.render()
  assert.equal(component._state, 'inDOM')
})
