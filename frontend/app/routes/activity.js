import ProtectedRoute from './protected';
import moment from 'moment';

export default ProtectedRoute.extend({
  'setupController': function(controller) {
    controller.setProperties({
      'momentFrom': +moment().startOf('month')
    , 'momentTo':   +moment().endOf('month')
    })
  }
})
