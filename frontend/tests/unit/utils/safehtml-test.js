import { default as safehtml, escape } from '../../../utils/safehtml'
import { module, test }                from 'qunit'

module('safehtml')

// Replace this with your real tests.
test('it works', function(assert) {
  assert.expect(2)

  let result = safehtml([ 'bar', 'baz' ], '<&foo\'>"')
  assert.equal(result, 'bar&lt;&amp;foo&#39;&gt;&quot;baz')

  assert.equal(escape('<&foo\'>"'), '&lt;&amp;foo&#39;&gt;&quot;')
})

test('it is an instance of String', function(assert) {
  assert.expect(3)

  let result   = safehtml([ 'foo', 'baz' ], 'bar')
  let toString = {}.toString

  assert.ok(result instanceof String)
  assert.equal(toString.call(result), toString.call(''))
  assert.equal(toString.call(result), '[object String]')
})

test('it can call toString', function(assert) {
  assert.expect(1)

  assert.equal(safehtml([ 'foo', 'baz' ], 'bar').toString(), 'foobarbaz')
})

test('it has a correct length', function(assert) {
  assert.expect(1)

  let result = safehtml([ 'foo', 'baz' ], 'bar')

  assert.equal(result.length, 'foobarbaz'.length)
})

test('it accepts undefined or null', function(assert) {
  assert.expect(4)

  let resultNull = safehtml([ 'foo', 'bar' ], null)

  assert.equal(resultNull, 'foobar')

  let resultUndefined = safehtml([ 'foo', 'bar' ], undefined)

  assert.equal(resultUndefined, 'foobar')

  let resultZero = safehtml([ 'foo', 'bar' ], 0)

  assert.equal(resultZero, 'foo0bar')

  let resultFalse = safehtml([ 'foo', 'bar' ], false)

  assert.equal(resultFalse, 'foofalsebar')
})

test('it equals to string', function(assert) {
  assert.expect(1)

  let result = safehtml([ 'foo', 'baz' ], 'bar')

  assert.equal(result, 'foobarbaz')
})

test('it can nest itself', function(assert) {
  assert.expect(1)

  let resultA = safehtml([ '<foo>', '<bar>' ], '<>')
  let resultB = safehtml([ '<blah>', '<blah>' ], resultA)

  assert.equal(resultB, '<blah><foo>&lt;&gt;<bar><blah>')
})

test('it can be called as a tagged template string', function(assert) {
  assert.expect(1)

  assert.equal(safehtml`foo>${'<bar>'}<baz`, 'foo>&lt;bar&gt;<baz')
})
