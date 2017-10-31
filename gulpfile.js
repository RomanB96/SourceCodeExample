// node_modules
const autoprefixer = require('gulp-autoprefixer');
const babelify     = require('babelify');
const browserify   = require('browserify');
const buffer       = require('vinyl-buffer');
const gulp         = require('gulp');
const gulpsync     = require('gulp-sync')(gulp);
const htmlmin      = require('gulp-htmlmin');
const imagemin     = require('gulp-imagemin');
const sass         = require('gulp-sass');
const sassdoc      = require('sassdoc');
const source       = require('vinyl-source-stream');
const sourcemaps   = require('gulp-sourcemaps');
const uglify       = require('gulp-uglify');


// Paths
const src     = './src';
const build   = './build';
const release = './release';
// HTML
const html_input   = src + '/**/*.html';
const html_build   = build;
const html_release = release;
// CSS
const css_input   = src + '/css/**/*.scss';
const css_build   = build;
const css_release = release;
// const css_maps    = css_build + '/maps';  // Don't work with path
const css_sassdoc = css_build + '/sassdoc';
// JS
const js_entry   = src + '/js/index.js';
const js_input   = src + '/js/**/*.js';
const js_build   = build;
const js_release = release;
// IMG
const img_input   = src + '/img/**/*.*';
const img_build   = build + '/img';
const img_release = release + '/img';


// Options
// HTML
const htmlminOptions = {
    collapseWhitespace: true
};
// CSS
const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
const sassReleaseOptions = {
    outputStyle: 'compressed'
};
const sassdocOptions = {
    dest: css_sassdoc
};
// JS
const browserifyOptions = { 
    entries: js_entry, 
    debug: true 
};
const transformPresetsOptions = { 
    presets: ["es2015"] 
};


// Default tasks
gulp.task('default', () =>
    console.log(
        '\n\r' + 'SCRIPTS' + '\n\r' +
        'npm run build'    + '\n\r' +
        'npm run watch'    + '\n\r' +
        'npm run release'  + '\n\r'
    )
);

gulp.task('build', gulpsync.async(['html_dev', 'css_dev', 'js_dev', 'img_dev']));
gulp.task('watch', gulpsync.sync(['build', 'watch_builded']));
gulp.task('watch_builded', gulpsync.async(['html_watch', 'css_watch', 'js_watch']));
gulp.task('release', gulpsync.async(['html_release', 'css_release', 'js_release', 'img_release']));


// HTML
gulp.task('html_dev', () =>
    gulp.src(html_input)
        .pipe(gulp.dest(html_build))
);
gulp.task('html_watch', () =>
    gulp.watch(html_input, ['html_dev'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        })
);
gulp.task('html_release', () =>
    gulp.src(html_input)
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest(html_release))
);


// CSS
gulp.task('css_dev', () =>
    gulp.src(css_input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sourcemaps.write(css_maps))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(css_build))
        .pipe(sassdoc(sassdocOptions))
        .resume()
);
gulp.task('css_watch', () =>
    gulp.watch(css_input, ['css_dev'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        })
);
gulp.task('css_release', () =>
    gulp.src(css_input)
        .pipe(sass(sassReleaseOptions))
        .pipe(autoprefixer())
        .pipe(gulp.dest(css_release))
);


// JS
gulp.task('js_dev', () =>
    browserify(browserifyOptions)
        .transform("babelify", transformPresetsOptions)
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(js_build))
);
gulp.task('js_watch', () =>
    gulp.watch(js_input, ['js_dev'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        })
);
gulp.task('js_release', () =>
    browserify(browserifyOptions)
        .transform("babelify", transformPresetsOptions)
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(js_release))
);


// IMG
gulp.task('img_dev', () =>
    gulp.src(img_input)
        .pipe(imagemin())
        .pipe(gulp.dest(img_build))
);
gulp.task('img_release', () =>
    gulp.src(img_input)
        .pipe(imagemin())
        .pipe(gulp.dest(img_release))
);