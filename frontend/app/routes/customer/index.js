import Ember            from 'ember'
import LoadingIndicator from 'timed/mixins/loading-indicator'

export default Ember.Route.extend(LoadingIndicator, {
  model: function() {
    return this.store.find('customer')
  }
})
