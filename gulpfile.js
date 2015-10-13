var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');

// Path config
var config = {
  bootstrapDir: './node_modules/bootstrap-sass',
  publicDir: './dist',
  sourceDir: './src',
  devDir: './src/dev'
};

// Bootstrap Sass
gulp.task('bootstrapSassConvert', function () {
  return gulp.src(config.sourceDir + '/sass/app.scss')
  .pipe(sass({
    includePaths: [config.bootstrapDir + '/assets/stylesheets']
  }))
  .pipe(rename({
    basename: 'bootstrap',
    extname: '.css'
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

// Sass to Css
gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.devDir + '/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Watch change
gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./src/dev/**/*.html', browserSync.reload);
});

// Default task
gulp.task('default', ['watch']);