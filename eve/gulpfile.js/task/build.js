const gulp = require('gulp');
const runSequence = require('run-sequence');

const WEBPACK_TASK_NAME = require('./webpack');
const BUILD_TASK_NAME = 'build';

gulp.task(BUILD_TASK_NAME, () => {

    runSequence(WEBPACK_TASK_NAME);
});
