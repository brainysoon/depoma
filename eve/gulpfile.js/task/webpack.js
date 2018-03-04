const gulp = require('gulp');
const webpack = require('gulp-webpack');

const webpackConfig = require('../../webpack.config');
const WEBPACK_TASK_NAME = 'webpack';

gulp.task(WEBPACK_TASK_NAME, () => {

    gulp.src('../../src')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist'));
});

module.exports = WEBPACK_TASK_NAME;