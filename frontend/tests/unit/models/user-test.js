import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', {
  needs: [
    'model:project'
  , 'model:team'
  , 'model:assignment'
  , 'model:attendance'
  , 'model:customer'
  , 'model:task'
  , 'model:activity'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
