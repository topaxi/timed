define(['backbone', 'views/dashboard/project'],
    function(Backbone, DashboardProjectView) {
  'use strict'

  var Dashboard = Backbone.View.extend({
      'events': {}
    , 'el': $('#dashboard')
    , 'render': function() {
        if (!this.el) return

        var self  = this
          , model = self.model
          , $el   = self.$el.empty()

        if (!self.projects.length) return

        $el.append('<h3>Your Projects</h3>')
        self.projects.each(function(project) {
          var eventView = new DashboardProjectView({ 'model': project })

          eventView.render()

          $el.append(eventView.el)
        })
      }
  })

  return Dashboard
})
