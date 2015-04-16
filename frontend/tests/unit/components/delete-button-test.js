import { moduleForComponent, test } from 'ember-qunit'

moduleForComponent('delete-button', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2)

  // creates the component instance
  let component = this.subject()
  assert.equal(component._state, 'preRender')

  // renders the component to the page
  this.render()
  assert.equal(component._state, 'inDOM')
})

test('it changes text to "Sure? on first click"', function(assert) {
  assert.expect(2)

  let component = this.subject()

  this.render()

  assert.notEqual(component.$().text(), 'Sure?')

  component.click()

  assert.equal(component.$().text(), 'Sure?')
})

test('it supports a custom confirm text', function(assert) {
  assert.expect(1)

  let component = this.subject({ confirmText: 'Foobar' })

  this.render()

  component.click()

  assert.equal(component.$().text(), 'Foobar')
})
