define(['backbone', 'views/dashboard/attendances', 'views/dashboard/project'],
    function(Backbone, DashboardAttendancesView, DashboardProjectView) {
  'use strict';

  var Dashboard = Backbone.View.extend({
      'events': {}
    , 'el': $('#dashboard')
    , 'render': function() {
        clearInterval(this.rerenderInterval)

        var user        = Timed.user
          , $el         = this.$el.empty()
          , attendances = new DashboardAttendancesView

        attendances.render()

        $el.append(attendances.el)

        this.rerenderInterval = setInterval(function() {
          attendances.render()
        }, 5000)

        if (user.get('projects').length) {
          var $div = $('<div class="span5">')

          $div.append('<h3>Your Projects</h3>')

          user.get('projects').forEach(function(project) {
            project = Timed.projects.get(project)

            var eventView = new DashboardProjectView({ 'model': project })

            eventView.render()

            $div.append(eventView.el)
          })
  
          $el.append($div)
        }
      }
  })

  return Dashboard
})
