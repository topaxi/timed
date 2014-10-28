import Ember from 'ember';
import { Timeline } from 'vis';

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
    var options = Ember.$.extend({}, this.get('visOptions'), {
      'onAdd':    (...args) => this.add(...args)
    , 'onUpdate': (...args) => this.update(...args)
    , 'onMove':   (...args) => this.move(...args)
    })

    this.set('timeline', new Timeline(
      this.$('#timeline')[0]
    , this.get('visData')
    , options
    ))

    this.get('timeline').setGroups(this.get('controller.users').map(user => {
      return { 'id': user.id, 'content': user.get('longName') }
    }))
  }.on('didInsertElement').observes('visData', 'visOptions')
})
