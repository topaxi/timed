/* jshint ignore:start */
import Ember            from 'ember'
import moment           from 'moment'
import LoadingIndicator from 'timed/mixins/loading-indicator'

export default Ember.Route.extend(LoadingIndicator, {
  queryParams: {
    from: { refreshModel: true, replace: true }
  , to:   { refreshModel: true, replace: true }
  , user: { refreshModel: true, replace: true }
  }

, setupController(controller, model) {
    controller.setProperties({
      momentFrom: +moment().startOf('month')
    , momentTo:   +moment().endOf('month')
    , projects:   this.store.all('projects')
    , customers:  this.store.all('customers')
    , model
    })
  }

, async beforeModel() {
    await* [
      this.store.find('project')
    , this.store.find('customer')
    , this.store.find('user')
    ]
  }

, model({ from, to, user }) {
    return this.store.find('attendance', { from, to, user })
  }

, async afterModel(model) {
    await* model.reduce((promises, attendance) => {
      attendance.get('activities').forEach(activity =>
        promises.push(activity.get('task'))
      )

      return promises
    }, [])
  }
})
