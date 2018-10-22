"use strict"

var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var clean = require('gulp-clean')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var minify = require('gulp-terser')
var csso = require('gulp-csso')
var sourceMap = require ('gulp-sourcemaps')
var imagemin = require('gulp-imagemin')
var runSequence = require('run-sequence')

gulp.task('clean', function () {
    return gulp.src('./dist', {read:false})
        .pipe(clean())
})

gulp.task('css', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourceMap.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('styles.min.css'))
        .pipe(csso())
        .pipe(sourceMap.write())
        .pipe(gulp.dest('./dist/css'));
})

gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js')
            .pipe(concat('script.min.js'))
            .pipe( minify())
            .pipe( gulp.dest('./dist/js'))
})

gulp.task('img', function(){
    return gulp.src('./src/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox:false}],
        }))
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('dev', function () {
    return runSequence('clean',['css','scripts','img'], function () {
        browserSync.init({
            server:'./'
        })
        gulp.watch('./src/scss/**/*.scss',['css']).on('change', browserSync.reload);
        gulp.watch('./src/js/**/*.js',['scripts']).on('change', browserSync.reload);
        gulp.watch('./index.html').on('change', browserSync.reload);
    })
})

gulp.task('build', function () {
    return runSequence('clean',['css','scripts','img'],function(){

    })
})