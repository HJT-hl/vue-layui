const gulp = require('gulp');
const less = require('gulp-less');
const tap = require("gulp-tap");
const {  getAssetsPath } = require('./utils')
const { styleOutputPath } = require('../config/index')
// 单独打包base.less

gulp.src('packages/_assets/base.less')
  .pipe(less({
    paths: [ getAssetsPath(styleOutputPath)]
  }))
  .pipe(tap( file => {file.contents = Buffer.from(file.contents.toString().replace(/\.\/font/g, '../fonts'))}))
  .pipe(gulp.dest('lib/style/'));

