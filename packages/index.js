// 收集组件
import Widght from "./widght";
// 需要把所有的组件储存起来,我们的组件肯定不止一个Button
const components = {Widght};

// // 定义install方法
const install = app => {
  // 判断是否install
  if (install.installed) return;
  install.installed = true;
  // 遍历注册所有的组件
  Object.values(components).forEach(component => app.use(component))
  // 检测到vue才会去知行
  if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
  }

 
}

// 对外暴露

export  default {
  install,
  ...components
}
