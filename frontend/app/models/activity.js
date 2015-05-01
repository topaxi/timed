/* jshint ignore:start */
import DS     from 'ember-data'
import moment from 'moment'
import Model  from './model'

const { attr, belongsTo } = DS

export default Model.extend({
  attendance: belongsTo('attendance')
, task:       belongsTo('task', { async: true })
, comment:    attr('string')
, review:     attr('boolean')
, nta:        attr('boolean')
, from:       attr('moment')
, to:         attr('moment')

, async save() {
    let isNew = this.get('isNew')

    await this.get('attendance').save()

    // Remove record, ember-data has a bug which duplicates
    // embedded records on saving the parent record, as it
    // does not know how to map the new record.
    // See https://github.com/emberjs/data/issues/1829
    if (isNew) {
      this.deleteRecord()
    }

    return this
  }

, end() {
    this.set('to', moment())

    return this
  }
})
