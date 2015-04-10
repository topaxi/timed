import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    customer: { refreshModel: true, replace: true }
  }

, setupController(controller, model) {
    let customers = this.store.all('customer')

    controller.setProperties({ model, customers })
  }

, beforeModel() {
    return Ember.RSVP.all([
      this.store.find('customer')
    , this.store.find('project')
    ])
  }

, model({ customerId: customer }) {
    if (!customer || customer === 'null') {
      return this.store.all('project')
    }

    return this.store.filter('project', { customer }, project =>
      project.get('customer.id') === customer
    )
  }
})
