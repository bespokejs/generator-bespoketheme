/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
  helpers = require('yeoman-generator').test;

describe('bespoketheme generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('bespoketheme:app', [
        '../../app'
      ]);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.travis.yml',
      'bower.json',
      'CONTRIBUTING.md',
      'gulpfile.js',
      'LICENSE',
      'package.json',
      'README.md',
      'lib/bespoke-theme-foobar.js',
      'lib/theme.styl',
    ];

    helpers.mockPrompt(this.app, {
      'themeName': 'foobar',
      'themeDescription': 'Foo bar baz',
      'githubUser': ''
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
