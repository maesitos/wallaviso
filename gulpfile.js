// Imports
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

// letiables
let sURLResources = 'static/';
let proxy = 'http://localhost:5000'

gulp.task('scripts', function () {
	return gulp.src([
		sURLResources + 'js/' + 'jquery-3.2.1.min.js',
		sURLResources + 'js/' + 'bootstrap.min.js',
		sURLResources + 'js/' + 'jquery.bootstrap-autohidingnavbar.min.js',
		sURLResources + 'js/' + 'main.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(sURLResources + 'js'));
});

gulp.task('sass', function() {
    return gulp.src(sURLResources + 'css/main.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(sURLResources + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
		proxy: proxy,
        open: false,
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch(sURLResources + '../templates/**/*.html').on('change', browserSync.reload);
    gulp.watch(sURLResources + '**/*.jpg').on('change', browserSync.reload);
    gulp.watch(sURLResources + '**/*.png').on('change', browserSync.reload);
    gulp.watch(sURLResources + 'css/main.scss', ['sass']);
});

gulp.task('default', ['watch', 'scripts', 'sass', 'browser-sync']);
