'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var cleanCss = require('gulp-clean-css');
var minifyJs = require('gulp-js-minify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var pngquant = require('imagemin-pngquant');
var runSequence = require('run-sequence');

var path = {
    dist:{
        server:         './dist',
        html:           './dist/html',
        html_index:     './dist/html/index.html',
        css:            './dist/css',
        js:             './dist/js',
        img:            './dist/img'
    },
    src:{
        html:         './src/html/*.html',
        html_index:   './src/html/index.html',
        html_modules: './src/html/modules/**/*.html',
        scss:         './src/scss/*.scss',
        scss_modules: './src/scss/modules/**/*.scss',
        /*
                scss_all:     './src/scss/!**!/!*.scss',*/
        js:           './src/js/script.js',
        js_modules:   './src/js/modules/*.js',
        img:          './src/img/**/*'
    }
};


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
        .pipe(rename("main.css")) // Изменение название с расширением css
        .pipe(gulp.dest(path.dist.css))
        .pipe(cssnano({ // Сжатие css файла
            zindex: false
        }))
        .pipe(rename({ suffix: '.min' })) // Добавление к css файлу суфикса min
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
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


gulp.task('build', function () {
    runSequence('clean', ['html', 'css', 'js', 'img']);
});

gulp.task('dev', function (){
    runSequence('clean', ['css', 'html', 'js', 'img'], function(){
        browserSync.init({
            server: path.dist.server
        });

        gulp.src(path.src.html_index)
            .pipe(rigger())
            .pipe(gulp.dest(path.dist.server));
        gulp.watch(path.src.scss_modules,['css']).on('change', browserSync.reload);
        gulp.watch(path.src.html_modules).on('change', function(){
            return gulp.src(path.src.html_index)
                .pipe(rigger())
                .pipe(gulp.dest(path.dist.server))
        });
        gulp.watch(path.src.html_modules).on('change', browserSync.reload)
    })
});