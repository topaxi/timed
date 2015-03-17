import Ember  from 'ember'
import moment from 'moment'

const $ = Ember.$

export function initialize() {
  interval(() =>
    updateClock($('#navbar').find('.clock'))
  , 1000)
}

function interval(fn, delay) {
  let start = Date.now()
  let time  = 0

  setTimeout(function repeat() {
    time += delay

    fn()

    let diff = Date.now() - start - time
    setTimeout(repeat, delay - diff)
  }, delay)
}

export function updateClock(el) {
  let now    = moment()
  let second = now.seconds() * 6
  let minute = now.minutes() * 6 + second / 60
  let hour   = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12

  $('.hour',   el).css('transform', `rotate(${hour}deg)`)
  $('.minute', el).css('transform', `rotate(${minute}deg)`)
  $('.second', el).css('transform', `rotate(${second}deg)`)
}

export default {
  name: 'clock'
, initialize
}
