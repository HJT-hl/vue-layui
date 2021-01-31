import Widght from "./src/Widght";
// 为组件提供install方法
Widght.install = app => {
  app.component(Widght.name, Widght);
};

export default Widght;
