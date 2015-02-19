import Ember from 'ember';
import moment from 'moment';

export function dateDuration(date1, date2, format) {
  if (!date1) {
    return ''
  }

  if (!date2 || !date2.isValid()) {
    var html = `<span data-from-now="true" data-from="${date1}">${date1.fromNow(true)}</span>`

    return new Ember.Handlebars.SafeString(html)
  }

  if (typeof format !== 'string') {
    format = 'h[h] mm[m]'
  }

  var diff      = Math.abs(moment(date1).diff(moment(date2)))
  var duration  = moment.duration(diff)
  var formatted = duration.format(format)

  return formatted
}

export default Ember.Handlebars.makeBoundHelper(dateDuration)
