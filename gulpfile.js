var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');

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
    server: './src',
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

//concat and minify css
gulp.task('createSkin', function() {
  return gulp.src(['src/dev/css/double_column.css','src/dev/css/footer.css','src/dev/css/navbar.css'])
    .pipe(concat('skin2.css'))
    .pipe(gulp.dest('src/dev/css/skin'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('src/dev/css/skin'))
});

// Watch change
gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./src/dev/**/*.html', browserSync.reload);
});

// Default task
gulp.task('default', ['watch']);