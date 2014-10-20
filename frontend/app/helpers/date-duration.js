import Ember from 'ember';
import moment from 'moment';

export default Ember.Handlebars.makeBoundHelper(function(date1, date2) {
   if (!date2 || !date2.isValid()) {
     date2 = moment.utc()
   }

   return moment.duration(moment.utc(date1).diff(moment.utc(date2))).humanize()
})
