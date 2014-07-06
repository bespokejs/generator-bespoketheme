[![Build Status](https://secure.travis-ci.org/markdalgleish/generator-bespoketheme.png?branch=master)](https://travis-ci.org/markdalgleish/generator-bespoketheme)

# Bespoke.js Theme Generator

A generator for [Yeoman](http://yeoman.io) that scaffolds a [Bespoke.js](http://markdalgleish.com/projects/bespoke.js) theme.

The boilerplate plugin includes a [Gulp](gulpjs.com) build system with [Browserify](http://browserify.org), [Stylus](http://learnboost.github.io/stylus), [Normalize.css](http://necolas.github.io/normalize.css) and [Autoprefixer](https://github.com/ai/autoprefixer) preconfigured.

> **Please note:** This generator is in beta and generates themes for a future release of Bespoke.js

## Usage

Assuming you have [Node.js](http://nodejs.org), install `generator-bespoketheme`:
```bash
$ npm install -g generator-bespoketheme
```

Make a new directory and `cd` into it:
```bash
$ mkdir bespoke-theme-mytheme
$ cd bespoke-theme-mytheme
```

Scaffold a new presentation:
```bash
$ yo bespoketheme
```

## Theme workflow

All source files for the theme reside in the `lib` directory.

Distributable versions of your theme are generated in the `dist` directory by the following [gulp](https://github.com/gulpjs/gulp) tasks:

### Gulp tasks

Compile the project:

```bash
$ gulp
```

Recompile your theme whenever source files change:

```bash
$ gulp dev
```

View the demo in a browser with LiveReload:

```bash
$ gulp demo
```

Compile and deploy the demo to GitHub pages:

```bash
$ gulp deploy
```

### Publish to npm

```bash
$ npm publish
```

### Register with Bower

Register theme with [Bower](http://bower.io/):

```bash
$ bower register <my-theme-name> <git-endpoint>
```

Bower uses [Git tags](http://git-scm.com/book/en/Git-Basics-Tagging) for versioning.

To publish an update, first modify the version number in `bower.json`, then tag a new version and push to origin:

```bash
$ git add .
$ git commit -m "Bump to vX.X.X"
$ git tag -a vX.X.X -m "vX.X.X"
$ git push --tags origin master
```

## License

[MIT License](http://markdalgleish.mit-license.org)
