/**
 * Created by gharsha on 4/26/2016.
 */
(function() {
    'use strict';
    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        watch = require('gulp-watch'),
        livereload = require('gulp-livereload'),
        _paths = ['server/**/*.js', 'client/js/*.js'];
//register nodemon task
    gulp.task('nodemon', function() {
        nodemon({
            script: 'server/server.js',
            env: {
                'NODE_ENV': 'development'
            }
        })
            .on('restart');
    });
// Rerun the task when a file changes
    gulp.task('watch', function() {
        livereload.listen();
        gulp.src(_paths, {
                read: false
            })
            .pipe(watch({
                emit: 'all'
            }))
        watch(_paths, livereload.changed);
    });
//lint js files
    gulp.task('lint', function() {
        gulp.src(_paths);
    });
// The default task (called when you run `gulp` from cli)
    gulp.task('default', ['lint', 'nodemon', 'watch']);
}());