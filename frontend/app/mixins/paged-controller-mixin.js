import Ember from 'ember'

const { computed } = Ember

export default Ember.Mixin.create({
  queryParams: [ 'page', 'limit' ]
, page:   1
, limit: 10

, totalPages: computed('model[]', 'limit', {
    get() {
      return Math.ceil(this.get('model.length') / this.get('limit'))
    }
  })

, modelSort: [ ]
, sortedModels: computed.sort('model', 'modelSort')

, pagedModels: computed('sortedModels', 'sortedModels[]', 'page', 'totalPages', 'limit', {
    get() {
      let limit = this.get('limit')
      let start = (this.get('page') - 1) * limit

      return this.get('sortedModels').slice(start, start + limit)
    }
  })

, showPager: computed('totalPages', {
    get() {
      return this.get('totalPages') > 1
    }
  })
})
