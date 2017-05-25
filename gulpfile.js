// Include gulp
var gulp = require('gulp');


// Include Plugins
var
  sass = require('gulp-sass');
  uglify = require('gulp-uglify'),
  newer = require('gulp-newer'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  htmlmin = require('gulp-htmlmin'),
  //browserSync = require('browser-sync');



  gulp.task('images', function() {
  var out ='dist/./';
  return gulp.src('src/**/*.{png,jpg}')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 2 }))
    .pipe(gulp.dest(out));
});

gulp.task('styles', function() {
    gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/./'));
});

gulp.task ('styles-watch', ['styles']);

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/./'));
});

gulp.task('cssnano', function(){
  return gulp.src('src/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/./'));
});

gulp.task('minify', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/./'));
});

//gulp web server
gulp.task('webserver', function() {
  connect.server();
});


//Watch task
gulp.task('run', ['minify', 'cssnano', 'js','images']);

gulp.task('watch',function() {

    gulp.watch('src/**/*.html',['minify']);

    gulp.watch('src/**/*.js',['js']);

    gulp.watch('src/**/*.scss',['styles-watch']);
});

gulp.task('default', ['run', 'watch']);
