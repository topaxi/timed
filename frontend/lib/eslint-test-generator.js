var path           = require('path')
var jsStringEscape = require('js-string-escape')

function render(errors) {
  if (!errors) return ''

  return errors.map(function(error) {
    return error.line + ':' + error.column + ' ' +
      ' - ' + error.message + ' (' + error.ruleId + ')'
  }).join('\n')
}

// Qunit test generator
module.exports = function eslintTestGenerator(relativePath, errors) {
  var pass = !errors || errors.filter(function(e) { return e.severity > 1 }).length === 0

  return "import { module, test } from 'qunit';\n" +
    "module('ESLint - " + path.dirname(relativePath) + "');\n" +
    "test('" + relativePath + " should pass ESLint', function(assert) {\n" +
    "  assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
    jsStringEscape("\n" + render(errors)) + "');\n" +
   "});\n"
}
