/**
 * Tarefas
 * Module Dependencies
 */
(function(){
    "use strict";
    var gulp = require('gulp');
    var jshint = require('gulp-jshint');
    var browserSync = require('browser-sync');
    var reload = browserSync.reload;
    var nodemon = require('gulp-nodemon');
    /**
    * Config
    */
    var paths = {
        styles: './client/css/*.css',
        scripts: './client/js/*.js',
        server: './server/bin/www'
    };
    var nodemonConfig = {
        script: paths.server,
        ext: 'html js css',
        ignore: ['node_modules']
    };
    /**
    * Gulp Tasks
    */
    gulp.task('lint', function() {
        return gulp.src(paths.scripts).pipe(jshint()).pipe(jshint.reporter('jshint-stylish'));
    });
    /**
    * Sincronização com o browser
    */
    gulp.task('browser-sync', ['nodemon'], function(done) {
        browserSync({
            proxy: "localhost:3000",  // local node app address
            port: 5000,  // use *different* port than above
            notify: false
        }, done);
    });
    /**
    * Execulta o node
    */
    gulp.task('nodemon', function (cb) {
        var called = false;
        return nodemon(nodemonConfig).on('start', function () {
            if (!called) {
                called = true;
                cb();
            }
        }).on('restart', function () {
            reload({ stream: false });
            // setTimeout(function () {
            // }, 1000);
        });
    });
    /**
    * Watch
    */
    gulp.task('watch', function() {
        gulp.watch(paths.scripts, ['lint']);
    });
    /**
    * Up
    */
    gulp.task('default', ['browser-sync', 'watch'], function(){});
}());
