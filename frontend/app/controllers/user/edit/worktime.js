import Ember from 'ember';
import Notify from 'ember-notify';
import moment from 'moment';

export default Ember.Controller.extend({
  init: function() {
    this.set('from', moment.utc())
    this.set('to',   moment.utc())
  }
, weekdays: function() {
    return moment.weekdays()
  }.property()
, actions: {
    submit: function() {
      var wt       = this.model.get('worktime') || {}
        , $sliders = Ember.$('.ui-slider') // TODO: We shouldn't access DOM stuff from our controller...

      for (var currentDate = this.get('from').clone(), to = this.get('to'); currentDate < to; currentDate.add(1, 'days')) {
        var value = $sliders.eq(currentDate.day()).slider('value')
          , index = currentDate.format('YYYY-MM-DD')

        wt[index] = value > 0 ? value : undefined
      }

      this.model.save().then(() =>
        Notify.success(`Worktime for ${this.model.get('name')} saved!`)
      )
    }
  }
})
