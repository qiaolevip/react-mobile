const path = require('path');
const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const minifyHtml = require('gulp-minify-html');

// set constiable via $ gulp --type production
const environment = $.util.env.type || 'development';
const runApp = $.util.env.app || 'app';
const isProduction = environment === 'production';
const webpackConfig = require('./webpack.config.js').getConfig(isProduction, runApp);

const port = $.util.env.port || 1337;
const app = runApp + '/';
const dist = 'dist/';
const assets = dist + 'assets/';

// https://github.com/ai/autoprefixer
const autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe(isProduction ? rev() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe(isProduction ? rev.manifest() : $.util.noop())
    .pipe(isProduction ? gulp.dest(assets + 'js') : $.util.noop())
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('styles',function() {
  // convert stylus to css
  return gulp.src(app + 'stylus/main.styl')
    .pipe($.stylus({
      // only compress if we are in production
      compress: isProduction,
      // include 'normal' css into main.css
      'include css' : true
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(isProduction ? rev() : $.util.noop())
    .pipe(gulp.dest(dist + 'css/'))
    .pipe(isProduction ? rev.manifest() : $.util.noop())
    .pipe(isProduction ? gulp.dest(assets + 'css') : $.util.noop())
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());
});

// copy images
gulp.task('images', function() {
  return gulp.src(app + 'images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest(dist + 'images/'));
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src([assets + '**/*.json', app + 'index.html'])
    .pipe(isProduction ? revCollector({
      replaceReved: true,
      dirReplacements: {
        'css': 'css',
        'js': 'js'
      }
    }) : $.util.noop())
    .pipe(isProduction ? minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }) : $.util.noop())
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

// add livereload on the given port
gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

// watch styl, html and js file changes
gulp.task('watch', function() {
  gulp.watch(app + 'stylus/*.styl', ['styles']);
  gulp.watch(app + 'index.html', ['html']);
  gulp.watch(app + 'scripts/**/*.js', ['scripts']);
  gulp.watch(app + 'scripts/**/*.jsx', ['scripts']);
});

// remove bundels
gulp.task('clean', function(cb) {
  return del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['scripts', 'styles', 'images', 'html', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function() {
  gulp.start(['scripts', 'styles', 'images', 'html']);
});