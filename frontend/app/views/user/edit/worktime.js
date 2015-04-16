import Ember from 'ember';
import { Graph2d } from 'vis';

const ZOOM = 1000 * 60 * 60 * 24 * 7 * 2 // Show ~2 weeks

export default Ember.View.extend({
  'visOptions': {
    'style':       'bar'
  , 'barChart':    { 'width': 20, 'align': 'center' }
  , 'height':      255
  , 'drawPoints':  false
  , 'graphHeight': 200
  , 'dataAxis':    {
      'icons':       false
    , 'width':       20
    , 'customRange': { 'left': { 'min': 0, 'max': 16 } }
    }
  , 'orientation': 'top'
  , 'zoomMin':     ZOOM
  }

, 'visItems': function() {
    let items = [ ]
      , wt    = this.get('controller.model.worktime')

    for (let x in wt) {
      // Set time to 12:00, or else the bars won't be centered for each day.
      // TODO: This might me solvable through correct visOptions.barChart.align
      items.push({ x: `${x} 12:00`, y: wt[x] })
    }

    return items;
  }.property('controller.model.worktime')

, 'renderGraph2d': function() {
    this.get('graph2d').setItems(this.get('visItems'))
  }.observes('visItems')

, 'updateGraph2dRange': function() {
    let graph2d = this.get('graph2d')

    if (graph2d) {
      let start = this.get('controller.from')
      let end   = this.get('controller.to')

      graph2d.setOptions({ start, end })
    }
  }.observes('controller.from', 'controller.to')

, 'setupGraph2d': function() {
    let start = this.get('controller.from')
    let end   = this.get('controller.to')

    let options = Ember.$.extend({}, this.get('visOptions'), { start, end })

    this.set('graph2d', new Graph2d(this.$('#graph')[0], null, options))

    this.renderGraph2d()
  }.on('didInsertElement')

, initDaterangePicker: function() {
    let options = {
      'startDate': this.get('controller.from')
    , 'endDate':   this.get('controller.to')
    }

    this.$('.daterange').daterangepicker(options, (from, to) => {
      this.set('controller.from', from)
      this.set('controller.to',   to)
    })
  }.on('didInsertElement')

, removeDaterangePicker: function() {
    let picker = this.$('.daterange').data('daterangepicker')

    if (picker) {
      picker.remove()
    }
  }.on('willDestroyElement')

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
