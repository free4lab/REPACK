var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var del = require('del');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

// Path config
var config = {
  bootstrapDir: './node_modules/bootstrap-sass',
  publicDir: './dist',
  devDir: './src/dev'
};

// Dev Bootstrap Sass
gulp.task('dev:bootstrapcss', function () {
  return gulp.src(config.devDir + '/sass/bootstrap.scss')
      .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets']
      }))
      .pipe(gulp.dest(config.devDir + '/bootstrap/css'));
});

// Dist Bootstrap CSS
gulp.task('dist:bootstrapcss', function () {
  return gulp.src(config.devDir + '/bootstrap/css/bootstrap.css')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/bootstrap/css'));
});

// Dev Bootstrap Fonts
gulp.task('dev:fonts', function () {
  return gulp.src(config.bootstrapDir + '/assets/fonts/bootstrap/**/*')
      .pipe(gulp.dest(config.devDir + '/bootstrap/fonts'));
});

// Dist Bootstrap Fonts
gulp.task('dist:fonts', function () {
  return gulp.src(config.devDir + '/bootstrap/fonts/*')
      .pipe(gulp.dest(config.publicDir + '/bootstrap/fonts'));
});

// Dist Bootstrap Fonts
gulp.task('dist:fonts', function () {
  return gulp.src(config.bootstrapDir + '/assets/fonts/bootstrap/**/*')
      .pipe(gulp.dest(config.devDir + '/bootstrap/fonts'));
});

// Dev Front CSS
gulp.task('dev:frontcss', function () {
  return gulp.src(config.devDir + '/sass/front.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest(config.devDir + '/css'));
});

// Dist Front CSS
gulp.task('dist:frontcss', ['dev:frontcss'], function () {
  return gulp.src(config.sourceDir + '/css/front.css')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/css'));
});

// Dev JS
gulp.task('dev:js', function () {
  // Bootstrap JS
  gulp.src(config.bootstrapDir + '/assets/javascripts/bootstrap.js')
      .pipe(gulp.dest(config.devDir + '/bootstrap/js'));

  // Front JS
  gulp.src([config.devDir + '/js/common/*.js', '!' + config.devDir + '/js/common/front.js'])
      .pipe(concat('front.js'))
      .pipe(gulp.dest(config.devDir + '/js/common'));
});

// Build For Dev
gulp.task('dev:build', ['dev:bootstrapcss', 'dev:fonts', 'dev:frontcss', 'dev:js']);

// Build Clean
gulp.task('clean:dev', function () {
  return del([
    config.devDir + '/css/front.css',
    config.devDir + '/js/common/front.js',
    config.devDir + '/bootstrap'
  ]);
});

// Dist
gulp.task('dist:build', ['dev:build'], function () {
  // Bootstrap CSS
  gulp.src(config.devDir + '/bootstrap/css/bootstrap.css')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/bootstrap/css'));

  // Bootstrap Fonts
  gulp.src(config.devDir + '/bootstrap/fonts/*')
      .pipe(gulp.dest(config.publicDir + '/bootstrap/fonts'));

  // Front CSS
  gulp.src(config.devDir + '/css/front.css')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/css'));

  // Theme CSS
  gulp.src(config.devDir + '/css/theme/*.css')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/css/theme'));

  // Bootstrap JS
  gulp.src(config.devDir + '/bootstrap/js/bootstrap.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/bootstrap/js'));

  // Front JS
  gulp.src(config.devDir + '/js/common/front.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/js/common'));

  // JQuery JS
  gulp.src(config.devDir + '/js/jquery/jquery.min.js')
      .pipe(gulp.dest(config.publicDir + '/js/jquery'));
});

// Clean Dist
gulp.task('clean:dist', function () {
  del(config.publicDir);
});

// Clean All
gulp.task('clean', ['clean:dev', 'clean:dist']);

// Web Server
gulp.task('browserSync', function () {
  browserSync.init({
    server: config.devDir,
    port: '8160'
  })
});

// Concat and Minify CSS
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
  gulp.watch(config.devDir + '/**/*.html', browserSync.reload);

  gulp.watch(config.devDir + '/sass/**/*.scss', function () {
    runSequence('clean:dev', 'dev:build', browserSync.reload);
  });
});

// Default task
gulp.task('default', function () {
  runSequence('clean:dev', 'dev:build', 'watch');
});