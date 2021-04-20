import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayAnim',
  props: {
    animate: {
      type: String,
      required: true
    },
    trigger: {
      type: Boolean,
      "default": true
    },
    loop: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var anim = '';

      if (props.trigger) {
        anim = "layui-anim-".concat(props.animate, " ");
        if (props.loop) anim += 'layui-anim-loop';
      }

      return _createVNode("div", {
        "class": 'layui-anim ' + anim
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));