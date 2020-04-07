let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function () {
    del.sync('build')
});

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))          //({outputStyle: 'compressed'}) - сжатие файла.  ({outputStyle: 'expanded'}) - делает файл читабельным
        .pipe(autoprefixer({
            overRideBrowsers: ['last 10 versions']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/slick-carousel/slick/slick-theme.css',
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('export', function () {
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('build'));

    let BuildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('build/css'));

    let BuildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('build/js'));

    let BuildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));

    let BuildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/**/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'))