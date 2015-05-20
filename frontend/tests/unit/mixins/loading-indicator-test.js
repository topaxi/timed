import Ember from 'ember'
import LoadingIndicatorMixin from '../../../mixins/loading-indicator'
import { module, test } from 'qunit'

module('LoadingIndicatorMixin')

// Replace this with your real tests.
test('it works', function(assert) {
  var LoadingIndicatorObject = Ember.Object.extend(LoadingIndicatorMixin)
  var subject = LoadingIndicatorObject.create()
  assert.ok(subject)
})
