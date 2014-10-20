import Ember from 'ember';
import moment from 'moment';

export default Ember.Handlebars.makeBoundHelper(function(value, format) {
   var date = moment(value)

   return date.isValid() ? date.format(format || 'LLLL') : ''
})
