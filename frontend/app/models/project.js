import DS      from 'ember-data'
import Model   from './model'
import Github  from '../utils/autocomplete/github'
import Redmine from '../utils/autocomplete/redmine'

export default Model.extend({
  'name':     DS.attr('string')
, 'customer': DS.belongsTo('customer', { 'async': true })
, 'tasks':    DS.hasMany('task', { 'async': true })
, 'tracker':  DS.attr('object', { 'defaultValue': { 'data': {} } })
, 'from':     DS.attr('moment')
, 'to':       DS.attr('moment')
, 'done':     DS.attr('boolean')

, 'searchName': function() {
    return `${this.get('customer.name')} ${this.get('name')}`
  }.property('customer.name', 'name')

, 'autocomplete': function() {
    switch (this.get('tracker.type')) {
      case 'github':  return Github.create({ project: this })
      case 'redmine': return Redmine.create({ project: this })
    }
  }.property('tracker.type')

, 'searchIssues': function(term = '') {
    return this.get('autocomplete').searchIssues(term)
  }
})
