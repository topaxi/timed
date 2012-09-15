define(['backbone', 'models/project', 'text!views/project/list.html'],
    function(Backbone, Project, tpl) {
  'use strict'

  var ProjectList = Backbone.View.extend({
      'events': { 'click .tasks':  'showTasks'
                , 'click .edit':   'edit'
                , 'click .create': 'edit'
                , 'click .follow': 'follow'
                }
    , 'render': function() {
        var self  = this
          , $el   = self.$el = $(tpl)
          , $list = $el.find('.list')

        self.delegateEvents()

        self.model.each(function(project) {
          $list.append(
            $('<li class="row-fluid">').append(
              $('<div class="span2">').append(createEditButton(project))
                                      .append(createTaskButton(project))
            ).append($('<div class="span9">').text(project.get('name')).css('line-height', '26px'))
             .append($('<div class="span1">').append(createFollowButton(project)))
          )
        })

        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
    , 'edit': function(e) {
        var model = $(e.currentTarget).data('model') || new Project
          , self  = this

        require(['views/project/edit'], function(ProjectEdit) {
          var view = new ProjectEdit({ 'model': model })

          view.on('close', function() { self.render() })

          view.render()
        })
      }
    , 'showTasks': function(e) {
        var model = $(e.currentTarget).data('model')
          , self  = this

        require(['collections/task', 'views/task/list'], function(Tasks, TaskList) {
          var tasks = new Tasks
            , view  = new TaskList({ 'model': tasks })

          view.on('close', function() { self.render() })

          tasks.project = model

          tasks.fetch({ 'success': function() { view.render() } })
        })
      }
    , 'follow': function(e) {
        var $el      = $(e.currentTarget)
          , $icon    = $el.find('i')
          , model    = $el.data('model')
          , projects = Timed.user.get('projects')
          , self     = this

        if ($el.hasClass('btn-primary')) {
          projects = projects.filter(function(project) {
            return project && (project._id || project) != model.id
          })

          Timed.user.save({ 'projects': projects }, { 'success': function() {
            $el.removeClass('btn-primary')
            $icon.removeClass('icon-ok-sign').addClass('icon-plus-sign')
          }})
        }
        else {
          projects.push(model.id)

          Timed.user.save({ 'projects': projects }, { 'success': function() {
            $el.addClass('btn-primary')
            $icon.removeClass('icon-plus-sign').addClass('icon-ok-sign')
          }})
        }
      }
  })

  function createFollowButton(model) {
    var followed = ~Timed.user.get('projects').indexOf(model.id)
    return $('<a class="btn btn-small follow" data-placement="right" title="Follow project" rel="tooltip"><i class="'+ (followed ? 'icon-ok-sign' : 'icon-plus-sign') +'"></i></a>')
             .data('model', model).tooltip()
             .toggleClass('btn-primary', !!followed)
  }

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal" data-placement="left" title="Edit project" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  function createTaskButton(model) {
    return $('<a class="btn btn-small tasks" data-dismiss="modal" data-placement="left" title="Edit project tasks" rel="tooltip"><i class="icon-tasks"></i></a>').data('model', model).tooltip()
  }

  return ProjectList
})
