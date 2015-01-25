import DS     from 'ember-data'
import moment from 'moment'
import Model  from './model'

export default Model.extend({
  'attendance': DS.belongsTo('attendance')
, 'task':       DS.belongsTo('task', { 'async': true })
, 'comment':    DS.attr('string')
, 'review':     DS.attr('boolean')
, 'from':       DS.attr('moment')
, 'to':         DS.attr('moment')

, save() {
    var isNew = this.get('isNew')

    this.get('attendance').save().then(() => {
      // Remove record, ember-data has a bug which duplicates
      // embedded records on saving the parent record, as it
      // does not know how to map the new record.
      // See https://github.com/emberjs/data/issues/1829
      if (isNew) {
        this.deleteRecord()
      }
    })
  }

, end() {
    this.set('to', moment())

    return this
  }
})
