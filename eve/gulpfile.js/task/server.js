const gulp = require('gulp');
const browserSync = require('browser-sync');

const SERVER_TASK_NAME = 'server';

gulp.task(SERVER_TASK_NAME, function () {
    browserSync.create()
        .init({
            server: {
                baseDir: "src"
            }
        });
});

module.exports = SERVER_TASK_NAME;