define(['backbone', 'models/customer', 'text!views/customer/list.html'],
    function(Backbone, Customer, tpl) {
  'use strict';

  var CustomerList = Backbone.View.extend({
      'events': { 'click .edit':   'edit'
                , 'click .create': 'edit'
                }
    , 'render': function() {
        var self  = this
          , $el   = self.$el = $(tpl)
          , $list = $el.find('.list')

        self.delegateEvents()

        self.model.each(function(customer) {
          $list.append(
            $('<li>').text(' '+ customer.get('name'))
                     .prepend(createEditButton(customer))
          )
        })

        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
    , 'edit': function(e) {
        var model = $(e.currentTarget).data('model') || new Customer
          , self  = this

        require(['views/customer/edit'], function(CustomerEdit) {
          var view = new CustomerEdit({ 'model': model })

          view.on('close', function() { self.render() })

          view.render()
        })
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal" data-placement="left" title="Edit customer" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  return CustomerList
})
