import Ember from 'ember';

export default Ember.View.extend({
  'visOptions': {
    'stack':       false
  , 'editable':    true
  , 'orientation': 'top'
  , 'width':       '100%'
  , 'autoResize':  false
  , 'zoomable':    0
  }
, 'renderTimeline': function() {
    this.set('timeline', new window.vis.Timeline(
      this.$('#timeline')[0])
    , this.get('visData')
    , Ember.$.extend({}, this.get('visOptions'), {
        'onAdd':    (...args) => this.add(...args)
      , 'onUpdate': (...args) => this.update(...args)
      , 'onMove':   (...args) => this.move(...args)
      })
    )
  }.on('didInsertElement').observes('visData', 'visOptions')
})
