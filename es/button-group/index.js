import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import './style/index';
export default defineComponent({
  name: 'LayButtonGroup',
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return _createVNode("div", {
        "class": 'layui-btn-group'
      }, [slots["default"] && slots["default"]()]);
    };
  }
});