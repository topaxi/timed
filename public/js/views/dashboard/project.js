define(['backbone', 'collections/task'], function(Backbone, Tasks) {
  'use strict';

  // TODO: Split out task into an own view
  var DashboardProjectView = Backbone.View.extend({
      'events': { 'click .activity': 'activity' }
    , 'tagName':   'div'
    , 'className': 'project'
    , 'initialize': function() {
        this.tasks = new Tasks
        this.tasks.project = this.model
      }
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
        this.$el.empty()

        var tasks  = this.tasks
          , $tasks = $('<ul class="unstyled">')
          , title  = this.model.get('name') +' '+ this.model.get('from').format('L')
          , to     = this.model.get('to')

        if (to) {
          title += ' - '+ to.format('L')
        }

        this.$el.append($('<h4>').text(title))
        this.$el.append($tasks)

        tasks.fetch({ 'success': function() {
          var activity      = Timed.user.getCurrentActivity()
            , currentTaskId

          if (activity) {
            currentTaskId = activity.get('task')
            currentTaskId = currentTaskId && currentTaskId.id || currentTaskId
          }

          tasks.each(function(task) {
            var active = activity && !activity.get('to') && task.id == currentTaskId

            $tasks.append($('<li>').text(task.get('name'))
                                   .prepend(createTrackTaskActivityButton(task, active)))
          })
        } })
      }
  })

  function createTrackTaskActivityButton(task, active) {
    return $('<div class="activity btn btn-small btn-inverse mrs"><i class="icon-white icon-'+ (active ? 'stop' : 'play') +'"></i></div>').data('task', task)
  }

  return DashboardProjectView
})
