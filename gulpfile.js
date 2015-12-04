var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var del = require('del');

// Path config
var config = {
  bootstrapDir: './node_modules/bootstrap-sass',
  publicDir: './dist',
  sourceDir: './src',
  devDir: './src/dev'
};

// Bootstrap Sass
gulp.task('bootstrapSassConvert', function () {
  return gulp.src(config.sourceDir + '/sass/bootstrap.scss')
      .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets']
      }))
      .pipe(minifycss())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(config.devDir + '/css'));
});

// Bootstrap Fonts
gulp.task('fonts', function () {
  return gulp.src(config.bootstrapDir + '/assets/fonts/bootstrap/**/*')
      .pipe(gulp.dest(config.devDir + '/fonts'));
});

// Front CSS
gulp.task('frontSassConvert', function () {
  return gulp.src(config.sourceDir + '/sass/front.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.devDir + '/css'));
});

// Build
gulp.task('build', ['bootstrapSassConvert', 'fonts', 'frontSassConvert']);

// Clean
gulp.task('clean:build', function () {
  return del([config.devDir + '/css/front.css', config.devDir + '/css/bootstrap.css']);
});

// Web Server
gulp.task('browserSync', function () {
  browserSync.init({
    server: './src/dev',
    port: '3000'
  })
});

//concat and minify css
gulp.task('createSkin', function() {
  return gulp.src(['src/dev/css/double_column.css','src/dev/css/footer.css','src/dev/css/navbar.css'])
      .pipe(concat('skin2.css'))
      .pipe(gulp.dest('src/dev/css/skin'))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
      .pipe(gulp.dest('src/dev/css/skin'))
});

// Watch change
gulp.task('watch', ['browserSync'], function () {
  gulp.watch('./src/sass/*.scss', ['build', 'clean:build']);
  gulp.watch('./src/dev/**/*.html', browserSync.reload);
});

// Default task
gulp.task('default', ['build', 'watch']);