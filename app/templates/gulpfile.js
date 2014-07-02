var gulp = require('gulp'),
  clean = require('gulp-clean'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  jade = require('gulp-jade'),
  connect = require('gulp-connect'),
  plumber = require('gulp-plumber'),
  opn = require('opn'),
  pkg = require('./package.json'),
  browserify = require('gulp-browserify'),
  through = require('through'),
  path = require('path'),
  template = require('lodash').template,
  isDemo = process.argv.indexOf('demo') > 0;

gulp.task('default', ['clean', 'compile']);
gulp.task('demo', ['compile', 'watch', 'connect']);
gulp.task('compile', ['compile:lib', 'compile:demo']);
gulp.task('compile:lib', ['stylus', 'browserify:lib']);
gulp.task('compile:demo', ['jade', 'browserify:demo']);

gulp.task('watch', function() {
  gulp.watch('lib/*', ['compile:lib', 'browserify:demo']);
  gulp.watch('demo/src/*.jade', ['jade']);
  gulp.watch('demo/src/**/*.js', ['browserify:demo']);
});

gulp.task('clean', function() {
  return gulp.src(['dist', 'lib/tmp'], { read: false })
    .pipe(clean());
});

gulp.task('stylus', function() {
  return gulp.src('lib/theme.styl')
    .pipe(isDemo ? plumber() : through())
    .pipe(stylus())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(csso())
    .pipe(gulp.dest('lib/tmp'));
});

gulp.task('browserify', ['browserify:lib', 'browserify:demo']);

gulp.task('browserify:lib', ['stylus'], function() {
  return gulp.src('lib/<%= themeFullName %>.js')
    .pipe(isDemo ? plumber() : through())
    .pipe(browserify({ transform: ['brfs'], standalone: 'bespoke.themes.<%= themeNameCamelized %>' }))
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

gulp.task('browserify:demo', function() {
  return gulp.src('demo/src/scripts/main.js')
    .pipe(isDemo ? plumber() : through())
    .pipe(browserify({ transform: ['brfs'] }))
    .pipe(rename('build.js'))
    .pipe(gulp.dest('demo/dist/build'))
    .pipe(connect.reload());
});

gulp.task('jade', function() {
  return gulp.src('demo/src/index.jade')
    .pipe(isDemo ? plumber() : through())
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('demo/dist'))
    .pipe(connect.reload());
});

gulp.task('connect', ['compile'], function(done) {
  connect.server({
    root: 'demo/dist',
    livereload: true
  });

  opn('http://localhost:8080', done);
});

gulp.task('deploy', ['compile:demo'], function(done) {
  ghpages.publish(path.join(__dirname, 'demo/dist'), { logger: gutil.log }, done);
});
