import Ember               from 'ember'
import startApp            from '../../../helpers/start-app'
import { moduleFor, test } from 'ember-qunit'

let App
let store

moduleFor('controller:team/edit/edit', 'TeamEditEditController', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  setup() {
    App   = startApp()
    store = App.__container__.lookup('store:main')
  }
, teardown() {
    Ember.run(() => App.destroy())
  }
})

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject({ store })
  assert.ok(controller)
})
