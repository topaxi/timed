import Ember from 'ember';
import moment from 'moment';

export default Ember.Handlebars.makeBoundHelper(function(date1, date2) {
   if (!date2 || !date2.isValid()) {
     date2 = moment()
   }

   return moment.duration(moment(date1).diff(moment(date2))).humanize()
})
