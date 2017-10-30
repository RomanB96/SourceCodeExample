// node_modules
var autoprefixer = require('gulp-autoprefixer');
var babelify     = require('babelify');
var browserify   = require('browserify');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sassdoc      = require('sassdoc');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');


// Paths
var src     = './src';
var build   = './build';
var release = './release';
// CSS
var css_input   = src + '/css/**/*.scss';
var css_output  = build + '/css';
var css_release = release + '/css';
// var css_maps    = css_output + '/maps';  // Don't work with path
var css_sassdoc = css_output + '/sassdoc';
// JS
var js_entry   = src + '/js/index.js';
var js_input   = src + '/js/**/*.js';
var js_output  = build + '/js';
var js_release = release + '/js';

// Options
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
        'npm run build   -> build sass and javascript'   + '\n\r' +
        'npm run watch   -> watch sass and javascript'   + '\n\r' +
        'npm run release -> release sass and javascript' + '\n\r'
    );
});

gulp.task('build', ['css_dev', 'js_dev']);
gulp.task('watch', ['css_watch']);
gulp.task('release', ['css_release']);


// CSS
gulp.task('css_dev', function () {
    return gulp
        .src(css_input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sourcemaps.write(css_maps))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(css_output))
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
        .pipe(gulp.dest(js_output));
});