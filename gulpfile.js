// node_modules
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps')

// paths
var src        = './src';
var dist       = './dist';
var css_input  = src + '/css/**/*.scss';
var css_output = dist + '/css';
var css_maps   = css_output + '/maps';


// sass
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp
    .src(css_input)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write(css_maps))
    .pipe(gulp.dest(css_output));
});