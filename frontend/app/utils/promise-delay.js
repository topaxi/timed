import Ember from 'ember';

export default function promiseDelay(delay) {
  return new Ember.RSVP.Promise(resolve => Ember.run.later(resolve, delay))
}
