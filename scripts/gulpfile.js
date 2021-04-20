const gulp = require("gulp");
const ts = require("gulp-typescript");
const tap = require("gulp-tap");
const less = require('gulp-less');
const babel = require('gulp-babel');
const {es,input,stylePath,commonjs} = require('../config')
const {resolve,sep} = require('path')

const sepReg = '\\' + sep;
const modelNameReg = new RegExp(input + sepReg + '(.*)'+sepReg +stylePath + sepReg + 'index.js')
const buildLess = (model,type)=>{
  const enteryPath = resolve(input,model,stylePath,'index.less')
  let output = resolve(es,model,stylePath)
  if(type === "commonjs") {
    output = resolve(commonjs,model,stylePath)
  }
  //打包 less文件
  gulp.src(enteryPath)
    .pipe(less())
    .pipe(gulp.dest(output));
}

function styleTs (file,type){
  const match = file.path.match(modelNameReg)
  if(match){
    buildLess(match[1],type)
    file.contents = Buffer.from(file.contents.toString().replace(/\.less/g,'.css'))
  }
}
const build = (type)=>{
  let mybabel = {
    presets: [["@babel/preset-env", { "modules": false }]],
    plugins: ["@vue/babel-plugin-jsx"]
  }
  if(type === "commonjs"){
    mybabel.plugins.push("@babel/plugin-transform-modules-commonjs")
  }
  const tsProject = ts.createProject(resolve(__dirname, "../config/build-tsconfig.json"));
  tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(babel(mybabel))
    .pipe(tap((file)=> styleTs(file,type) ))
    .pipe(gulp.dest(`${type === 'commonjs' ? commonjs : es}`));

}
build("commonjs")
build("es")
module.exports = build;


