var bespoke = require('bespoke'),
  <%= themeNameCamelized %> = require('../../../lib/<%= themeFullName %>.js'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  progress = require('bespoke-progress'),
  state = require('bespoke-state');

bespoke.from('article', [
  <%= themeNameCamelized %>(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  scale(),
  progress(),
  state()
]);
