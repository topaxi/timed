import { moduleForModel, test } from 'ember-qunit'

moduleForModel('assignment', {
  needs: [
    'model:user'
  , 'model:project'
  , 'model:task'
  , 'model:team'
  , 'model:attendance'
  , 'model:customer'
  ]
})

test('it exists', function(assert) {
  var model = this.subject()
  // var store = this.store()
  assert.ok(!!model)
})
