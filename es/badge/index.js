import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayBadge',
  props: {
    type: {
      type: String,
      "default": ''
    },
    color: {
      type: String,
      "default": '#FF5722'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var isSlots = true;
    var className = 'layui-badge';
    var color = props.color;
    var style = {
      backgroundColor: color,
      borderColor: color
    };

    if (props.type === 'dot') {
      isSlots = false;
      className = 'layui-badge-dot';
    } else if (props.type === 'rim') {
      className = 'layui-badge-rim';
      style.backgroundColor = '#fff';
    }

    return function () {
      return _createVNode("div", {
        "class": className,
        "style": style
      }, [isSlots && slots["default"] && slots["default"]()]);
    };
  }
}));