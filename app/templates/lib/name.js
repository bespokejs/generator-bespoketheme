var fs = require('fs');
var classes = require('bespoke-classes');
var insertCss = require('insert-css');

module.exports = function() {
  return function(deck) {
    classes()(deck);
    var css = fs.readFileSync(__dirname + '/tmp/theme.css', 'utf8');
    insertCss(css, { prepend: true });
  };
};
