const {assetsPath,input,baseStyle,es,commonjs} = require('../config')
const {copyDirectory} = require('./utils')
const {resolve,extname} = require('path')
const less = require('gulp-less');
const gulp = require("gulp");
function callback(src,dest,item){
  if(extname(item) === ".less"){
    const enteryPath = resolve(src,item)
    const output = resolve(dest)
    //打包 less文件
    gulp.src(enteryPath)
      .pipe(less())
      .pipe(gulp.dest(output));
    return false
  }
  return true
}

function copyAsset(type){
  const entry = resolve(__dirname,'../',input,assetsPath)
  let output;
  if(type==="commonjs"){
    output = resolve(__dirname,'../',commonjs,assetsPath)
  }else {
    output = resolve(__dirname,'../',es,assetsPath)
  }
  copyDirectory(entry,output,callback)
}


module.exports =function(type) {
  copyAsset(type)
}
