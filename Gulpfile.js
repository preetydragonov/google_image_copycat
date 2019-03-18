'use strict';
	
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('js:build', done => {
	gulp.src(['./src/**/*.js', '!./src/**/*.min.js'])
	    .pipe(plumber())
	    .pipe(uglify())
	    .pipe(rename({suffix: '.min'}))
	    .pipe(gulp.dest('./src'));
    done();
});
	
gulp.task('js:lint', done => {
 	gulp.src(['./src/**/*.js', '!./src/**/*.min.js', 'Gulpfile.js'])
	    .pipe(plumber())
	    .pipe(jscs())
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'));
    done();
});
	
gulp.task('build', gulp.series(
    gulp.parallel(
        'js:lint', 
        'js:build'
    )
));
	
gulp.task('watch', gulp.series(
    gulp.parallel(
        'build', 
        done => {gulp.watch(
            ['./src/**/*.js', 'Gulpfile.js'], 
            ['build']
            );
        done();
        }
    )
));