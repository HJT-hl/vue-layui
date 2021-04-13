const path = require('path')
const fs = require('fs')
var { outputPath } = require('../config/index')
const chalk = require('chalk')

function  rmSync(FP){
  try{
      let stats = fs.statSync(FP);
      if (stats.isFile()) {
          /*是文件，删文件*/
          fs.unlinkSync(FP);
      }
      if (stats.isDirectory()){
          /*是目录，遍历目录*/
          let info = fs.readdirSync(FP);

          /*目录有内容，先删掉目录的内容*/
          if (info.length){
              /*有内容*/
              info.forEach(item=>{
                  let p = path.join(FP,item);
                  rmSync(p);
              });
          }

          /*最终内容*/
          fs.rmdirSync(FP);
      }
  }catch (e){}

}
function copyDirectory(src, dest) {
  if (  fs.existsSync(dest) === false) {
    fs.mkdirSync(dest);
  }
  if (fs.existsSync(src) === false) {
    return false;
  }
  // console.log("src:" + src + ", dest:" + dest);
  // 拷贝新的内容进去
  const dirs = fs.readdirSync(src);
  dirs.forEach(function(item){
    const item_path = path.join(src, item);
    const temp = fs.statSync(item_path);
    if (temp.isFile()) { // 是文件
      fs.copyFileSync(item_path, path.join(dest, item));
    } else if (temp.isDirectory()){ // 是目录
      copyDirectory(item_path, path.join(dest, item));
    }
  });
}
module.exports = {
  rmSync,
  copyDirectory,
  getAssetsPath(_path = '.') {
    return path.posix.join(outputPath, _path)
  },
  resolve(_path) {
    return _path ? path.resolve(__dirname, _path) : path.resolve(__dirname, '..', outputPath)
  },
  isProduct: ['production', 'prod'].includes(process.env.NODE_ENV),
  env: process.env.NODE_ENV,
  chalkConsole: {
    success: () => {
      console.log(chalk.green(`=========================================`))
      console.log(chalk.green(`========打包成功(build success)!=========`))
      console.log(chalk.green(`=========================================`))
    },
    building: (index, total) => {
      console.log(chalk.blue(`正在打包第${index}/${total}个文件...`))
    }
  },
  fsExistsSync: (_path) => {
    try {
      fs.accessSync(_path, fs.F_OK)
    } catch (e) {
      return false
    }
    return true
  },

}
