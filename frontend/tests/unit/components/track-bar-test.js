import { moduleForComponent, test } from 'ember-qunit'

moduleForComponent('track-bar', 'TrackBarComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  needs: [ 'component:track-attendance' ]
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
