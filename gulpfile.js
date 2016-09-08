var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');

var links = [
    'public/source/common/app.js',
    'public/source/common/app.router.js',
    'public/source/components/modal.js',
    'public/source/services/messages.service.js',
    'public/source/services/parse.service.js',
    'public/source/services/services.js',
    'public/source/views/details/details.js',
    'public/source/views/header/header.js',
    'public/source/views/home/home.js'
];


gulp.task('compress-libs', function() {
    return gulp.src([
        'public/source/libs/angular-1.4.4.js',
        'public/source/libs/angular-ui-router.js',
        'public/source/libs/angular-breadcrumb.js',
        'public/source/libs/angular-resource.js',
        'public/source/libs/parse-1.6.14.js',
        'public/source/libs/x2js.js',
        'public/source/libs/pubsub.js',
        'public/source/libs/jquery.js',
        'public/source/libs/bootstrap.js'
        ])
        .pipe(uglify())
        .pipe(concat('libs-min.js'))
        .pipe(gulp.dest('build/libs/'));
});
gulp.task('compress-views', function() {
    gulp.src(links)
        .pipe(uglify())
        .pipe(concat('build.js'))
        .pipe(gulp.dest('build/components/'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src('public/source/css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(minifyCss(""))
        .pipe(gulp.dest('build/css/'))
        .pipe(connect.reload());
});
gulp.task('template', function () {
    return gulp.src('public/source/views/**/*.tpl.html')
        .pipe(templateCache('templates.js', { module:'templates', standalone:true}))
        .pipe(gulp.dest('build/templates'));
});

gulp.task('watch', function () {
    gulp.watch('public/source/css/*.css', ['css']);
//    gulp.watch('dev/public/source/components/**/*.js', ['compress-views']);
});

gulp.task('default', ['template', 'compress-views', 'css', 'compress-libs', 'watch']);