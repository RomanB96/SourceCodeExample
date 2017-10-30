// node_modules
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc      = require('sassdoc');

// paths
var src         = './src';
var dist        = './dist';
var css_input   = src + '/css/**/*.scss';
var css_output  = dist + '/css';
var css_maps    = css_output + '/maps';
var css_maps    = css_output + '/maps';
var css_sassdoc = css_output + '/sassdoc'; 

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
        '\n\r' +
        'SCRIPTS\n\r' +
        'npm run build -> build sass' +
        '\n\r'
    );
});

gulp.task('sass', function () {
    return gulp
        .src(css_input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(css_maps))
        .pipe(autoprefixer())
        .pipe(gulp.dest(css_output))
        .pipe(sassdoc(sassdocOptions))
        .resume();
});