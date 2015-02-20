import Ember                        from 'ember'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'
import { skip }                     from 'qunit'

let App
let store

moduleForComponent('follow-project', 'FollowProjectComponent', {
  needs: [ 'model:project' ]
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

  let project = store.createRecord('project')

  // creates the component instance
  var component = this.subject({ project })
  assert.equal(component._state, 'preRender')

  // appends the component to the page
  this.render()
  assert.equal(component._state, 'inDOM')
})
