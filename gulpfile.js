// node_modules
var autoprefixer = require('gulp-autoprefixer');
var babelify     = require('babelify');
var browserify   = require('browserify');
var buffer       = require('vinyl-buffer');
var gulp         = require('gulp');
var gulpsync     = require('gulp-sync')(gulp);
var htmlmin      = require('gulp-htmlmin');
var imagemin     = require('gulp-imagemin');
var sass         = require('gulp-sass');
var sassdoc      = require('sassdoc');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');


// Paths
var src     = './src';
var build   = './build';
var release = './release';
// HTML
var html_input   = src + '/**/*.html';
var html_build   = build;
var html_release = release;
// CSS
var css_input   = src + '/css/**/*.scss';
var css_build   = build;
var css_release = release;
// var css_maps    = css_build + '/maps';  // Don't work with path
var css_sassdoc = css_build + '/sassdoc';
// JS
var js_entry   = src + '/js/index.js';
var js_input   = src + '/js/**/*.js';
var js_build   = build;
var js_release = release;
// IMG
var img_input   = src + '/img/**/*.*';
var img_build   = build + '/img';
var img_release = release + '/img';


// Options
// HTML
var htmlminOptions = {
    collapseWhitespace: true
};
// CSS
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
var sassReleaseOptions = {
    outputStyle: 'compressed'
};
var sassdocOptions = {
    dest: css_sassdoc
};
// JS
var browserifyOptions = { 
    entries: js_entry, 
    debug: true 
};
var transformPresetsOptions = { 
    presets: ["es2015"] 
};


// Default tasks
gulp.task('default', function () {
    console.log(
        '\n\r' + 'SCRIPTS' + '\n\r' +
        'npm run build'    + '\n\r' +
        'npm run watch'    + '\n\r' +
        'npm run release'  + '\n\r'
    );
});

gulp.task('build', gulpsync.async(['html_dev', 'css_dev', 'js_dev', 'img_dev']));
gulp.task('watch', gulpsync.sync(['build', 'watch_builded']));
gulp.task('watch_builded', gulpsync.async(['html_watch', 'css_watch', 'js_watch']));
gulp.task('release', gulpsync.async(['html_release', 'css_release', 'js_release', 'img_release']));


// HTML
gulp.task('html_dev', function() {
    return gulp
        .src(html_input)
        .pipe(gulp.dest(html_build));
});
gulp.task('html_watch', function() {
    return gulp
        .watch(html_input, ['html_dev'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});
gulp.task('html_release', function() {
    return gulp
        .src(html_input)
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest(html_release));
});


// CSS
gulp.task('css_dev', function () {
    return gulp
        .src(css_input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sourcemaps.write(css_maps))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(css_build))
        .pipe(sassdoc(sassdocOptions))
        .resume();
});
gulp.task('css_watch', function() {
    return gulp
        .watch(css_input, ['css_dev'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});
gulp.task('css_release', function () {
    return gulp
        .src(css_input)
        .pipe(sass(sassReleaseOptions))
        .pipe(autoprefixer())
        .pipe(gulp.dest(css_release));
});


// JS
gulp.task('js_dev', function () {
    return browserify(browserifyOptions)
        .transform("babelify", transformPresetsOptions)
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(js_build));
});
gulp.task('js_watch', function () {
    return gulp
        .watch(js_input, ['js_dev'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});
gulp.task('js_release', function () {
    return browserify(browserifyOptions)
        .transform("babelify", transformPresetsOptions)
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(js_release));
});


// IMG
gulp.task('img_dev', function () {
    return gulp
        .src(img_input)
        .pipe(imagemin())
        .pipe(gulp.dest(img_build))
});
gulp.task('img_release', function () {
    return gulp
        .src(img_input)
        .pipe(imagemin())
        .pipe(gulp.dest(img_release))
});