import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index'; // TODO : 流体元素

export default withInstall(defineComponent({
  name: 'LayContainer',
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return _createVNode("div", {
        "class": "layui-container"
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));