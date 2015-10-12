var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Path config
var config = {
  bootstrapDir: './node_modules/bootstrap-sass',
  publicDir: './dist',
  sourceDir: './src',
  devDir: './src/dev'
};

// Bootstrap Sass (Currently useless)
gulp.task('bootstrapSassConvert', function () {
  return gulp.src(config.sourceDir + '/sass/app.scss')
  .pipe(sass({
    includePaths: [config.bootstrapDir + '/assets/stylesheets']
  }))
  .pipe(gulp.dest(config.devDir + '/css'));
});

// Bootstrap Fonts
gulp.task('fonts', function () {
  return gulp.src(config.bootstrapDir + '/assets/fonts/bootstrap/**/*').pipe(gulp.dest(config.devDir + '/fonts'));
});

// Web Server
gulp.task('browserSync', function () {
  browserSync.init({
    server: './src/dev',
    port: '3000'
  })
});

// Watch change
gulp.task('watch', ['browserSync'], function () {
  gulp.watch('./src/sass/*.scss', function (event) {
    gulp.src(event.path).pipe(sass()).pipe(autoprefixer()).pipe(gulp.dest(config.devDir + '/css'));
    browserSync.reload();
  });
  gulp.watch('./src/dev/**/*.html', browserSync.reload);
});

// Default task
gulp.task('default', ['watch']);