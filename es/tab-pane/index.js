import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayTabPane',
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      "default": ''
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return _createVNode("div", {
        "class": "layui-tab-content"
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));