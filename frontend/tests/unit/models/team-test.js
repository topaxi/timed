import { moduleForModel, test } from 'ember-qunit'

moduleForModel('team', {
  needs: [
    'model:user'
  , 'model:project'
  , 'model:assignment'
  , 'model:attendance'
  ]
})

test('it exists', function(assert) {
  var model = this.subject()
  // var store = this.store()
  assert.ok(!!model)
})
