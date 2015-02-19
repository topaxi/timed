import moment           from 'moment'
import { dateDuration } from '../../../helpers/date-duration'
import { module, test } from 'qunit'

module('DateDurationHelper')

// Replace this with your real tests.
test('it works', function(assert) {
  var date1 = moment()
  var date2 = moment(date1).subtract(1, 'minute')

  var result = dateDuration(date1, date2)
  assert.equal(result, '1m')

  date2 = moment(date1).subtract(1, 'hour')

  result = dateDuration(date1, date2)
  assert.equal(result, '1h 00m')
})

test('from now works', function(assert) {
  var result = dateDuration(moment())
  assert.strictEqual(result.string.indexOf('<span data-from'), 0)
})
