import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(...args) {
  return console.log(...args)
})
