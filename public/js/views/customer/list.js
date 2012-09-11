define(['backbone', 'models/customer', 'text!views/customer/list.html'],
    function(Backbone, Customer, tpl) {
  'use strict'

  var CustomerList = Backbone.View.extend({
      'render': function() {
        var $el   = this.$el = $(tpl)
          , $list = $el.find('.list')

        this.model.each(function(customer) {
          $list.append(
            $('<li>').text(' '+ customer.get('name'))
                     .prepend(createEditButton(customer))
          )
        })

        $list.on('click', '.edit', edit)
        $el.find('.create').click(edit)
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal"><i class="icon-edit"></a>').data('model', model)
  }

  function edit(e) {
    e.preventDefault()

    var model = $(this).data('model') || new Customer

    require(['views/customer/edit'], function(CustomerEdit) {
      (new CustomerEdit({ 'model': model })).render()
    })
  }

  return CustomerList
})
