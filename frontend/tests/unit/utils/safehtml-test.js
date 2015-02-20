import { default as safehtml, escape } from '../../../utils/safehtml';
import { module, test }                from 'qunit';

module('safehtml');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = safehtml([ 'bar', 'baz' ], '<&foo\'>"');
  assert.equal(result.safehtml, 'bar&lt;&amp;foo&#39;&gt;&quot;baz');

  assert.equal(escape('<&foo\'>"'), '&lt;&amp;foo&#39;&gt;&quot;');
});
