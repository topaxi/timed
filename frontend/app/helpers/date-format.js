import Ember from 'ember';
import moment from 'moment';

export default Ember.Handlebars.makeBoundHelper(function(value, format) {
   return moment(value).format(format || 'LLLL')
})
