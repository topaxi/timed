import Ember                from 'ember'
import PagedControllerMixin from 'timed/mixins/paged-controller-mixin'

const { computed, run } = Ember

export default Ember.Controller.extend(PagedControllerMixin, {
  queryParams: [ { 'customerId': 'customer' } ]
, modelSort: [ 'customer.name:asc', 'name:asc' ]

, filter: ''
, projectFilter: ''

, sortable: computed.alias('projects')
, projects: computed('model', 'filter', {
    get() {
      let filter = this.get('filter').toLowerCase()

      return this.get('model').filter(project =>
        project.get('name').toLowerCase().includes(filter)
      )
    }
  })

, filterProjects() {
    this.send('resetPaging')

    let filter = this.get('projectFilter')

    if (!filter || filter.length > 2) {
      this.set('filter', this.get('projectFilter'))
    }
  }

, actions: {
    updateFilter() {
      run.debounce(this, this.filterProjects, 200)
    }
  }
})
