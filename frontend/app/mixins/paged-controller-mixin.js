import Ember from 'ember'

export default Ember.Mixin.create({
  page:   1
, limit: 20
, totalPages: function() {
    return Math.ceil(this.get('model.length') / this.get('limit'))
  }.property('model[]', 'limit')

, modelSort: [ ]
, sortedModels: Ember.computed.sort('model', 'modelSort')

, pagedModels: function() {
    let limit = this.get('limit')
    let start = (this.get('page') - 1) * limit

    return this.get('sortedModels').slice(start, start + limit)
  }.property('sortedModels[]', 'page', 'totalPages', 'limit')

, showPager: function() {
    return this.get('totalPages') > 1
  }.property('totalPages')
})
