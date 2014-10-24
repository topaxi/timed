import Ember from 'ember';
import moment from 'moment';

export var initialize = function() {
  setInterval(() =>
    Ember.$('[data-from]').each((i, el) =>
      el.textContent = moment(+el.dataset.from).fromNow(el.dataset.fromNow)
    )
  , 5000)
}

export default {
  name: 'from-now'

, initialize: initialize
}
