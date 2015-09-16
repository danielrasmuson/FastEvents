var gulp = require('gulp');
var babel = require('gulp-babel');
var intercept = require('gulp-intercept');
var _ = require('lodash');
var jasmine = require('gulp-jasmine');
var runSequence = require('run-sequence');

var DEVELOPMENT_FILES = ['./**/*.js', '!node_modules/**/*', '!./**/*_es5*'];
var TEST_FILES = ['!node_modules/**/*', './**/*_es5_spec.js'];

gulp.task('babel', function () {
  return gulp.src(DEVELOPMENT_FILES)
    .pipe(intercept(function(file){

      // Change the file names
      if (_.includes(file.path, '_spec')){
        // FILE: Server/Scripts/google/calendar/OauthClient_spec.js
        // TO FILE: Server/Scripts/google/calendar/OauthClient_es5_spec.js
        file.path = _.head(file.path.split('_spec.js'))+'_es5_spec.js';
      } else{
        // FILE: Server/Scripts/google/calendar/OauthClient.js
        // TO FILE: Server/Scripts/google/calendar/OauthClient_es5.js
        file.path = _.head(file.path.split('.js'))+'_es5.js';
      }

      // Change require statements
      // matches require('./.*') and replaces with require('./.*_es5')
      file.contents = new Buffer(file.contents.toString().replace(/(require\(\'\.\/(.|\n)+?)\'\)/g, "$1_es5')"));

      return file;
    }))
    .pipe(babel())
    .pipe(gulp.dest('.'))
});

gulp.task('test', ['babel'], function(){
  return gulp.src(TEST_FILES)
    .pipe(jasmine())
})

gulp.task('dev', function(){
  return gulp.watch(DEVELOPMENT_FILES, ['babel', 'test'])
});
