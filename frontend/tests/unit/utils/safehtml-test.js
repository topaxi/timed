import { default as safehtml, escape } from '../../../utils/safehtml'
import { module, test }                from 'qunit'

module('safehtml')

// Replace this with your real tests.
test('it works', function(assert) {
  assert.expect(2)

  var result = safehtml([ 'bar', 'baz' ], '<&foo\'>"')
  assert.equal(result, 'bar&lt;&amp;foo&#39;&gt;&quot;baz')

  assert.equal(escape('<&foo\'>"'), '&lt;&amp;foo&#39;&gt;&quot;')
})

test('it is an instance of String', function(assert) {
  assert.expect(1)

  var result = safehtml([ 'foo', 'baz' ], 'bar')

  assert.ok(result instanceof String)
})

test('it has a correct length', function(assert) {
  assert.expect(1)

  var result = safehtml([ 'foo', 'baz' ], 'bar')

  assert.equal(result.length, 'foobarbaz'.length)
})

test('it accepts undefined or null', function(assert) {
  assert.expect(4)

  var resultNull = safehtml([ 'foo', 'bar' ], null)

  assert.equal(resultNull, 'foobar')

  var resultUndefined = safehtml([ 'foo', 'bar' ], undefined)

  assert.equal(resultUndefined, 'foobar')

  var resultZero = safehtml([ 'foo', 'bar' ], 0)

  assert.equal(resultZero, 'foo0bar')

  var resultFalse = safehtml([ 'foo', 'bar' ], false)

  assert.equal(resultFalse, 'foofalsebar')
})

test('it equals to string', function(assert) {
  assert.expect(1)

  var result = safehtml([ 'foo', 'baz' ], 'bar')

  assert.equal(result, 'foobarbaz')
})

test('it can nest itself', function(assert) {
  assert.expect(1)

  var resultA = safehtml([ '<foo>', '<bar>' ], '<>')
  var resultB = safehtml([ '<blah>', '<blah>' ], resultA)

  assert.equal(resultB, '<blah><foo>&lt;&gt;<bar><blah>')
})

test('it can be called as a tagged template string', function(assert) {
  assert.expect(1)

  assert.equal(safehtml`foo>${'<bar>'}<baz`, 'foo>&lt;bar&gt;<baz')
})
