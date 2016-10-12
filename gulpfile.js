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
var order = require('gulp-order');

// Path config
var config = {
  bootstrapDir: './node_modules/bootstrap-sass',
  publicDir: './dist',
  devDir: './src/dev'
};

// Dev Bootstrap Sass
/*gulp.task('dev:bootstrapcss', function () {
  return gulp.src(config.devDir + '/sass/bootstrap.scss')
      .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets']
      }))
      .pipe(gulp.dest(config.devDir + '/bootstrap/css'));
});*/

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
  gulp.src(config.devDir + '/sass/doc.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest(config.devDir + '/css'));

  return gulp.src(config.devDir + '/sass/front.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest(config.devDir + '/css'));
});

// Dist Front CSS
gulp.task('dist:frontcss', ['dev:frontcss'], function () {
  return gulp.src(config.sourceDir + '/css/front.css')
      //.pipe(minifycss())
      //.pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/css'));
});

// Dev JS
gulp.task('dev:js', function () {
  // Front JS
  gulp.src([config.devDir + '/js/common/*.js', '!' + config.devDir + '/js/common/front.js'])
      .pipe(order([
        'configure.js',
        '*.js'
      ]))
      .pipe(concat('front.js'))
      .pipe(gulp.dest(config.devDir + '/js/common'));
});

// Build For Dev
gulp.task('dev:build', ['dev:fonts', 'dev:frontcss', 'dev:js']);

// Build Clean
gulp.task('clean:dev', function () {
  return del([
    config.devDir + '/css/front.css',
    config.devDir + '/js/common/front.js',
    config.devDir + '/bootstrap/css',
    config.devDir + '/bootstrap/fonts'
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
      //.pipe(minifycss())
      //.pipe(rename({suffix: '.min'}))
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

  //favico JS
  gulp.src(config.devDir + '/plugin/favico/favico.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/plugin/favico'));

  // FileUpload JS
  gulp.src(config.devDir + '/plugin/fileupload/fileupload.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/plugin/fileupload'));
 
 //ImgUpload JS
  gulp.src(config.devDir + '/plugin/imgupload/imgupload.js')
      .pipe(gulp.dest(config.publicDir + '/plugin/imgupload'));

  // Datepicker JS
  gulp.src(config.devDir + '/plugin/datepicker/ui/js/datepicker-zh-CN.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/plugin/datepicker/js'));

  // Datepicker CSS
  gulp.src(config.devDir + '/plugin/datepicker/ui/css/*')
      .pipe(gulp.dest(config.publicDir + '/plugin/datepicker/css'));

  gulp.src(config.devDir + '/plugin/datepicker/ui/js/jquery-ui.min.js')
      .pipe(gulp.dest(config.publicDir + '/plugin/datepicker/js'));

  // Gallery
  gulp.src([config.devDir + '/plugin/gallery/**/*', '!' + config.devDir + '/plugin/gallery/css/blueimp-gallery.min.css'])
      .pipe(gulp.dest(config.publicDir + '/plugin/gallery/'));

  gulp.src(config.devDir + '/plugin/gallery/css/blueimp-gallery.css')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/plugin/gallery/css/'));

  // Animate CSS
  gulp.src(config.devDir + '/css/animate/animate.css')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/css/animate/'));

  // Bootstrap DatetimePicker
  gulp.src(config.devDir + '/plugin/bootstrap-datetimepicker/build/**/*')
      .pipe(gulp.dest(config.publicDir + '/plugin/bootstrap-datetimepicker'));

  // Moment
  gulp.src(config.devDir + '/plugin/moment/*')
      .pipe(gulp.dest(config.publicDir + '/plugin/moment/'));

  // prismjs
  gulp.src(config.devDir + '/plugin/prismjs/css/*')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/plugin/prismjs/css/'));

  gulp.src(config.devDir + '/plugin/prismjs/js/prism.min.js')
      .pipe(gulp.dest(config.publicDir + '/plugin/prismjs/js/'));

  gulp.src(config.devDir + '/plugin/prismjs/js/toolbar.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/plugin/prismjs/js/'));

//slider
  gulp.src(config.devDir + '/plugin/slider/css/bootstrap-slider.min.css')
      .pipe(gulp.dest(config.publicDir + '/plugin/slider/css/'));

  gulp.src(config.devDir + '/plugin/slider/js/bootstrap-slider.min.js')
      .pipe(gulp.dest(config.publicDir + '/plugin/slider/js/'));

  // zeroClipboard
  gulp.src(config.devDir + '/plugin/zeroClipboard/*')
      .pipe(gulp.dest(config.publicDir + '/plugin/zeroClipboard/'));

  gulp.src(config.devDir + '/plugin/zeroClipboard/ZeroClipboard.swf')
      .pipe(gulp.dest(config.publicDir + '/plugin/zeroClipboard/'));

  // zTree
  gulp.src([config.devDir + '/plugin/zTree/**/*',
            '!' + config.devDir + '/plugin/zTree/css/zTreeStyle.css',
            '!' + config.devDir + '/plugin/zTree/js/jquery.ztree.core-3.5.js'])
      .pipe(gulp.dest(config.publicDir + '/plugin/zTree/'));

  gulp.src(config.devDir + '/plugin/zTree/css/zTreeStyle.css')
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/plugin/zTree/css/'));

  gulp.src(config.devDir + '/plugin/zTree/js/jquery.ztree.core-3.5.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.publicDir + '/plugin/zTree/js/'));
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