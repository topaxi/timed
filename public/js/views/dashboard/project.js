define(['backbone', 'collections/task'], function(Backbone, Tasks) {
  'use strict';

  // TODO: Split out task into an own view
  var DashboardProjectView = Backbone.View.extend({
      'events': { 'click .activity': 'activity' }
    , 'tagName':   'div'
    , 'className': 'project mtl'
    , 'activity': function(e) {
        var $button    = $(e.currentTarget)
          , user       = Timed.user
          , task       = $button.data('task')
          , $icon      = $button.find('i')

        if ($icon.is('.icon-play')) {
          user.startActivity(task)

          user.save()

          $icon.removeClass('icon-play').addClass('icon-stop')
        }
        else {
          user.endCurrentActivity()

          user.save()

          $icon.removeClass('icon-stop').addClass('icon-play')
        }

        this.render()
      }
    , 'render': function() {
        var user     = Timed.user
          , tasks    = Timed.tasks
          , project  = this.model
          , $el      = this.$el
          , $tasks   = $('<ul class="unstyled">')
          , title    = project.get('name') +' '+ project.get('from').format('L')
          , to       = project.get('to')
          , activity = Timed.user.getCurrentActivity()
          , currentTaskId

        if (to) {
          title += ' - '+ to.format('L')
        }

        if (activity) {
          currentTaskId = activity.get('task')
          currentTaskId = currentTaskId && currentTaskId.id || currentTaskId
        }

        tasks.where({ 'project': project.id }).forEach(function(task) {
          var active = activity && !activity.get('to') && task.id == currentTaskId

          $tasks.append($('<li>').text(task.get('name')).addClass('mvs')
                                 .prepend(createTrackTaskActivityButton(task, active)))
        })

        $el.empty()
        $el.append($('<h4>').text(title))
        $el.append($tasks)
      }
  })

  function createTrackTaskActivityButton(task, active) {
    return $('<div class="activity btn btn-small btn-inverse mrs"><i class="icon-white icon-'+ (active ? 'stop' : 'play') +'"></i></div>').data('task', task)
  }

  return DashboardProjectView
})
