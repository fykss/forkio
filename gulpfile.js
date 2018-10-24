'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const cleanCss = require('gulp-clean-css');
const minifyJs = require('gulp-js-minify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const pngquant = require('imagemin-pngquant');
const runSequence = require('run-sequence');

const path = {
    dist:{
        server:         './dist',
        html_index:     './dist/index.html',
        css:            './dist/css',
        js:             './dist/js',
        img:            './dist/img'
    },
    src:{
        html:         './src/html/**/*.html',
        html_index:   './src/html/index.html',
        html_modules: './src/html/modules/**/*.html',
        scss:         './src/scss/*.scss',
        scss_modules: './src/scss/**/*.scss',
        /*
                scss_all:     './src/scss/!**!/!*.scss',*/
        js:           './src/js/script.js',
        js_modules:   './src/js/modules/*.js',
        img:          './src/img/**/*'
    }
};

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('html', function () {
    gulp.src(path.src.html) //Выбор файла по нужному пути
        .pipe(rigger()) // Плагин позволяет хранить статичные части сайта, такие как header, footer, aside и т.д., в отдельных файлах и подключать их в любой части другого файла. Больше нет надобности, в случае мелких изменений в шапке, менять десятки, а то и сотни html страниц шаблона
        .pipe(gulp.dest(path.dist.server)) // Запись файла в папку dist
});

gulp.task('css', function () {
    return gulp.src(path.src.scss)
        .pipe(plumber()) // Отслеживание ошибок
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded' // Добавление отступов между классами в итоговых стилях
        }))
        .pipe(autoprefixer({ // Добавление префиксов
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename("style.css")) // Изменение название с расширением css
        .pipe(gulp.dest(path.dist.css))
        .pipe(cssnano({ // Сжатие css файла
            zindex: false
        }))
        .pipe(rename({ suffix: '.min' })) // Добавление к css файлу суфикса min
        .pipe(gulp.dest(path.dist.css));
});



gulp.task('js', function () {
    return gulp.src(path.src.js) //Находит main.js файл
        .pipe(rigger())
        .pipe(plumber())
        .pipe(uglify()) //Сжатие js
        .pipe(gulp.dest(path.dist.js)) //Выплюнем готовый файл в build
});

gulp.task('img', function(){
    return gulp.src(path.src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('copy', function () {
    gulp.src('./src/vendors/slick/**/*.*')
        .pipe(gulp.dest('./dist/slick'));
});

gulp.task('build', function () {
    runSequence('clean', ['html', 'copy', 'css', 'js', 'img']);
});

gulp.task('dev', function (){
    runSequence('clean', ['html', 'copy', 'css', 'js', 'img'], function(){
        browserSync.init({
            server: path.dist.server
        });

        gulp.watch(path.src.scss_modules, ['css']).on('change',browserSync.reload);
        gulp.watch(path.src.html, ['html']).on('change', browserSync.reload)
        gulp.watch(path.src.js, ['js']).on('change', browserSync.reload)
    })
});


