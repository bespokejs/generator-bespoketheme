[![Build Status](https://secure.travis-ci.org/<%= githubUser %>/<%= themeFullName %>.png?branch=master)](https://travis-ci.org/<%= githubUser %>/<%= themeFullName %>) [![Coverage Status](https://coveralls.io/repos/<%= githubUser %>/<%= themeFullName %>/badge.png)](https://coveralls.io/r/<%= githubUser %>/<%= themeFullName %>)

# <%= themeFullName %>

<%= themeDescription.replace(/Bespoke\.js/g, '[Bespoke.js](http://markdalgleish.com/projects/bespoke.js)') %> &mdash; [View demo](http://<%= githubUser %>.github.io/<%= themeFullName %>)

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/<%= githubUser %>/<%= themeFullName %>/master/dist/<%= themeFullName %>.min.js
[max]: https://raw.github.com/<%= githubUser %>/<%= themeFullName %>/master/dist/<%= themeFullName %>.js

## Usage

This theme is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  <%= themeNameCamelized %> = require('<%= themeFullName %>');

bespoke.from('#presentation', [
  <%= themeNameCamelized %>()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.themes.<%= themeNameCamelized %>()
]);
```

## Package managers

### npm

```bash
$ npm install <%= themeFullName %>
```

### Bower

```bash
$ bower install <%= themeFullName %>
```

## Credits

This theme was built with [generator-bespoketheme](https://github.com/markdalgleish/generator-bespoketheme).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
