const fs =require('fs')
const path =require('path')

function mkdirs(dirname) {
  const mkdir = (paths,num)=>{

    if(paths.length < num) return;
    const dir = paths.slice(0,num).join(path.sep)
    if(fs.existsSync(dir) === false){
      fs.mkdirSync(dir)
    }
    mkdir(paths,++num)
  }
  mkdir(dirname.split(path.sep),1)
}
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

function copyDirectory(src, dest,callback) {
  if (  fs.existsSync(dest) === false) {
    mkdirs(dest);
  }
  if (fs.existsSync(src) === false) {
    return false;
  }
  // 拷贝新的内容进去
  const dirs = fs.readdirSync(src);
  dirs.forEach(function(item){
    const item_path = path.join(src, item);
    const temp = fs.statSync(item_path);
    if (temp.isFile()) { // 是文件
      if(callback(src,dest,item)){
        fs.copyFileSync(item_path, path.join(dest, item));
      }
    } else if (temp.isDirectory()){ // 是目录
      copyDirectory(item_path, path.join(dest, item),callback);
    }
  });
}

module.exports = {
  rmSync,
  copyDirectory
}
