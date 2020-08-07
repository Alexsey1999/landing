const gulp = require('gulp'),
      browsersync = require('browser-sync').create(),
      fileInclude = require('gulp-file-include'),
      del = require('del'),
      scss = require('gulp-sass')
      autoprefixer = require('gulp-autoprefixer')
      gcmq = require('gulp-group-css-media-queries');
      cleanCSS = require('gulp-clean-css');
      rename = require('gulp-rename')
      uglify = require('gulp-uglify-es').default;
      babel = require('gulp-babel');
      ghPages = require('gulp-gh-pages');

const prod_folder = 'dist'
const source_folder = 'src'

const path = {
  build: {
    html: prod_folder + '/',
    css: prod_folder + '/css',
    js: prod_folder + '/js',
    img: prod_folder + '/img',
    fonts: prod_folder + '/fonts'
  },
  src: {
    html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    css: source_folder + '/scss/style.scss',
    allcss: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/script.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: source_folder + '/fonts/*',
    jslibs: source_folder + '/js/libs/**/*.js'
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    jslibs: source_folder + '/js/libs/**/*.js'
  },
  clean: './' + prod_folder + '/'
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + prod_folder + '/'
    },
    notify: false
  });
}

function images() {
  return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
}

function fonts() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
}

function css() {
  return gulp.src(path.src.css)
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(gcmq())
    .pipe(autoprefixer({
      overrideBrowserslist:  ['last 5 versions'],
      cascade: true
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browsersync.stream())
}

function html() {
  return gulp.src(path.src.html)
    .pipe(fileInclude())
    .pipe(gulp.dest(path.build.html))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.jslibs], jslibs)
  gulp.watch([path.watch.html], html)
  gulp.watch([path.src.allcss], css)
  gulp.watch([path.src.js], js)
  gulp.watch([path.src.img], images)
}

function clean() {
  return del(path.clean)
}

function js() {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream())
}

function jslibs() {
  return gulp.src(path.src.jslibs)
    .pipe(gulp.dest(path.build.js + '/libs'))
}

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

const build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, jslibs))
const watch = gulp.parallel(build, watchFiles, browserSync)

exports.jslibs = jslibs
exports.fonts = fonts
exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch
