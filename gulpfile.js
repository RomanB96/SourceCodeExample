// node_modules
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc      = require('sassdoc');
var browserify   = require('browserify');
var babelify     = require('babelify');
var source       = require('vinyl-source-stream');

// paths
var src     = './src';
var dist    = './dist';
var release = './release';
// css
var css_input   = src + '/css/**/*.scss';
var css_output  = dist + '/css';
var css_release = release + '/css';
// var css_maps    = css_output + '/maps';  // Don't work with path
var css_sassdoc = css_output + '/sassdoc';
// js
var js_entry   = src + '/js/index.js';
var js_input   = src + '/js/**/*.js';
var js_output  = dist + '/js';
var js_release = release + '/js';

// sass
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
var sassdocOptions = {
    dest: css_sassdoc
};


gulp.task('default', function () {
    console.log(
        '\n\r' + 'SCRIPTS' + '\n\r' +
        'npm run build   -> build sass'   + '\n\r' +
        'npm run watch   -> watch sass'   + '\n\r' +
        'npm run release -> release sass' + '\n\r'
    );
});

gulp.task('sass', function () {
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

gulp.task('javascript', function () {
    return browserify( { entries: js_entry, debug: true } )
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(js_output));
});

gulp.task('watch', function() {
    return gulp
        .watch(css_input, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('release', function () {
    return gulp
        .src(css_input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(css_release));
});