import Ember from 'ember';
import Notify from 'ember-notify';
import moment from 'moment';

export default Ember.Controller.extend({
  init: function() {
    this.set('from', moment().startOf('month'))
    this.set('to',   moment().endOf('month'))
  }
, weekdays: function() {
    return moment.weekdays()
  }.property()
, actions: {
    submit: function() {
      var wt       = this.model.get('worktime') || {}
        , $sliders = Ember.$('.ui-slider') // TODO: We shouldn't access DOM stuff from our controller...

      moment.range(this.get('from'), this.get('to')).by('days', day => {
        var value = $sliders.eq(day.day()).slider('value')
          , index = day.format('YYYY-MM-DD')

        wt[index] = value > 0 ? value : undefined
      })

      this.model.set('worktime', wt)

      this.model.save().then(() =>
        Notify.success(`Worktime for ${this.model.get('name')} saved!`)
      )
    }
  }
})
