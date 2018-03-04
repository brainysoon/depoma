const gulp = require('gulp');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const browserSync = require('browser-sync');


const webpackConfig = require('./webpack.config');

const WEBPACK_TASK_NAME = 'webpack';
const BUILD_TASK_NAME = 'build';
const SERVER_TASK_NAME = 'server';
const START_TASK_NAME = 'start';


gulp.task(START_TASK_NAME, () => {

    runSequence(BUILD_TASK_NAME, SERVER_TASK_NAME);
});

gulp.task(BUILD_TASK_NAME, () => {

    runSequence(WEBPACK_TASK_NAME);
});

gulp.task(SERVER_TASK_NAME, function () {
    browserSync.create()
        .init({
            server: ['src', 'dist']
        });
});

gulp.task(WEBPACK_TASK_NAME, () => {

    return webpack(webpackConfig, (error, status) => {

        if (error) console.log(error);

        console.log('webpack complete build :)');
    });
});