/* jshint node:true,browser:false */
module.exports = {
  name: 'customise-bootstrap'

, isDevelopingAddon: function() {
    return true
  }

, treeFor: function(type) {
    if (type === 'addon') {
      var compileLess = require('broccoli-less-single')

      return compileLess([ this.app.trees.styles ], 'bootstrap.less', 'bootstrap.css')
    }
  }
}
