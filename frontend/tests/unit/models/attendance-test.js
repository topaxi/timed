import Ember from 'ember'
import moment from 'moment'
import { moduleForModel, test } from 'ember-qunit'

moduleForModel('attendance', {
  needs: [
    'model:user'
  , 'model:activity'
  , 'model:project'
  , 'model:team'
  , 'model:assignment'
  , 'model:task'
  ]
})

test('it exists', function(assert) {
  let model = this.subject()

  assert.ok(!!model)
})

test('it can end itself', function(assert) {
  assert.expect(2)

  let model = this.subject()

  Ember.run(function() {
    assert.ok(model.end().get('to').isValid())

    // This might fail if the two generated timestamps ever change a minute
    assert.equal(
      model.get('to').format('YYYY MM DD hh:mm')
    , moment().format('YYYY MM DD hh:mm')
    )
  })
})
