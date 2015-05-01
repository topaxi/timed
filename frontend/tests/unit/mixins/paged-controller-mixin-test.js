import Ember from 'ember'
import PagedControllerMixinMixin from '../../../mixins/paged-controller-mixin'
import { module, test } from 'qunit'

module('PagedControllerMixinMixin')

// Replace this with your real tests.
test('it works', function(assert) {
  var PagedControllerMixinObject = Ember.Object.extend(PagedControllerMixinMixin)
  var subject = PagedControllerMixinObject.create()
  assert.ok(subject)
})
