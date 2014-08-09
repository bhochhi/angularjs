var gulp = require('gulp'); 
var connect = require('gulp-connect');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');




gulp.task('connect', function() {
  connect.server({
    root: 'app/'
  });
});


//default task
gulp.task('build',function(){
	gulp.src(['./app/**/*.html'], {base: './app'})
  	.pipe(usemin({
      css: [minifyCss(), 'concat',rev()],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('host',['build','connect']);

