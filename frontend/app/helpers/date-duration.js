import Ember from 'ember'
import moment from 'moment'

export function dateDuration(date1, date2, format) {
  if (!date1) {
    return ''
  }

  if (!date2 || !date2.isValid()) {
    let html = `<span data-from-now="true" data-from="${date1}">${date1.fromNow(true)}</span>`

    return new Ember.Handlebars.SafeString(html)
  }

  let diff      = Math.abs(moment(date1).diff(moment(date2)))
  let duration  = moment.duration(diff)
  let formatted = duration.format(typeof format !== 'string' ? 'h[h] mm[m]' : format)

  return formatted
}

export default Ember.Handlebars.makeBoundHelper(dateDuration)
