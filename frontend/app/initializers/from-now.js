import Ember from 'ember'
import moment from 'moment'

export function initialize() {
  setInterval(() =>
    Ember.$('[data-from]').each((i, el) =>
      el.textContent = moment(+el.dataset.from).fromNow(el.dataset.fromNow)
    )
  , 5000)
}

export default {
  name: 'from-now'
, initialize
}
