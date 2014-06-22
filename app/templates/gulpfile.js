var gulp = require('gulp'),
  clean = require('gulp-clean'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCss = require('gulp-minify-css'),
  pkg = require('./package.json'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  path = require('path'),
  template = require('lodash').template;

gulp.task('default', ['compile']);
gulp.task('dev', ['compile', 'watch']);
gulp.task('compile', ['stylus', 'browserify']);

gulp.task('watch', function() {
  gulp.watch('lib/**/*', ['compile']);
});

gulp.task('clean', function() {
  return gulp.src(['dist', 'lib/tmp'], { read: false })
    .pipe(clean());
});

gulp.task('stylus', ['clean'], function() {
  return gulp.src('lib/theme.styl')
    .pipe(stylus())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifyCss())
    .pipe(gulp.dest('lib/tmp'));
});

gulp.task('browserify', ['clean', 'stylus'], function() {
  return browserify('./lib/<%= themeFullName %>.js')
    .transform('brfs')
    .bundle({ standalone: 'bespoke.themes.<%= themeName %>' })
    .pipe(source('<%= themeFullName %>.js'))
    .pipe(buffer())
    .pipe(header(template([
      '/*!',
      ' * <%%= name %> v<%%= version %>',
      ' *',
      ' * Copyright <%%= new Date().getFullYear() %>, <%%= author.name %>',
      ' * This content is released under the <%%= licenses[0].type %> license',
      ' * <%%= licenses[0].url %>',
      ' */\n\n'
    ].join('\n'), pkg)))
    .pipe(gulp.dest('dist'))
    .pipe(rename('<%= themeFullName %>.min.js'))
    .pipe(uglify())
    .pipe(header(template([
      '/*! <%%= name %> v<%%= version %> ',
      '© <%%= new Date().getFullYear() %> <%%= author.name %>, ',
      '<%%= licenses[0].type %> License */\n'
    ].join(''), pkg)))
    .pipe(gulp.dest('dist'));
});
