import Ember from 'ember';

export default Ember.View.extend({
  initDaterangePicker: function() {
    this.$('.daterange').daterangepicker({}, (from, to) => {
      this.set('controller.from', from)
      this.set('controller.to',   to)
    })
  }.on('didInsertElement')
, initSliders: function() {
    this.$('.ui-slider').slider({
      'min':    0
    , 'max':   24
    , 'value':  8
    , 'step':   0.5
    , 'slide': (e, ui) => Ember.$(ui.handle).closest('.form-slider').next().text(ui.value)
    })
  }.on('didInsertElement')
})
