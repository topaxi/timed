import Ember from 'ember';
import moment from 'moment';

export default Ember.Handlebars.makeBoundHelper(function(date1, date2) {
   if (!date1) {
     return ''
   }

   if (!date2 || !date2.isValid()) {
     return new Ember.Handlebars.SafeString(
       `<span data-from-now="true" data-from="${date1}">${date1.fromNow(true)}</span>`)
   }

   return moment.duration(moment(date1).diff(moment(date2))).humanize()
})
