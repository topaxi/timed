import Ember   from 'ember'
import DS      from 'ember-data'
import Model   from './model'
import Github  from '../utils/autocomplete/github'
import Redmine from '../utils/autocomplete/redmine'

const { computed } = Ember
const { attr, belongsTo, hasMany } = DS

export default Model.extend({
  name:           attr('string')
, customer:       belongsTo('customer', { async: true })
, projectLeaders: hasMany('user', { async: true, inverse: null })
, tasks:          hasMany('task', { async: true })
, tracker:        attr('object', { defaultValue: { data: {} } })
, from:           attr('moment')
, to:             attr('moment')
, done:           attr('boolean')

, searchName: computed('customer.name', 'name', {
    get() {
      return `${this.get('customer.name')} - ${this.get('name')}`
    }
  })

, autocomplete: computed('tracker.type', {
    get() {
      switch (this.get('tracker.type')) {
        case 'github':  return Github.create({ project: this })
        case 'redmine': return Redmine.create({ project: this })
      }
    }
  })

, searchIssues(term = '') {
    return this.get('autocomplete').searchIssues(term)
  }
})
