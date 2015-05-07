import Ember                from 'ember'
import PagedControllerMixin from 'timed/mixins/paged-controller-mixin'

const { computed, observer } = Ember

export default Ember.Controller.extend(PagedControllerMixin, {
  queryParams: [ { 'customerId': 'customer' } ]
, modelSort: [ 'customer.name:asc', 'name:asc' ]

, projectFilter: ''

, sortable: computed.alias('projects')
, projects: computed('model', 'projectFilter', {
    get() {
      let filter   = this.get('projectFilter').toLowerCase()
      let projects = this.get('model')

      if (filter.length > 2) {
        projects = projects.filter(project =>
          project.get('name').toLowerCase().includes(filter)
        )
      }

      return projects
    }
  })

, resetPaging: observer('projectFilter', function() {
    this.send('resetPaging')
  })
})
