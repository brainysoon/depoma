const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

requireDir('./task');

const START_TASK_NAME = 'start';

gulp.task(START_TASK_NAME, () => {

    runSequence('build', 'server');
});