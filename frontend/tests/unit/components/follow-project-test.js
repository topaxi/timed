import Ember                        from 'ember'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'

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

test('it renders', function(assert) {
  assert.expect(2)

  Ember.run(() => {
    let project = store.createRecord('project')
    let session = { user: Ember.Object.create() }

    // creates the component instance
    var component = this.subject({ project, session })
    assert.equal(component._state, 'preRender')

    // appends the component to the page
    this.render()
    assert.equal(component._state, 'inDOM')
  })
})
