import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayButton',
  props: {
    type: {
      type: String,
      "default": ''
    },
    onClick: {
      type: Function,
      "default": function _default() {}
    },
    size: {
      type: String,
      "default": ''
    },
    fluid: {
      type: Boolean,
      "default": false
    },
    radius: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var className = ['layui-btn '];
      className.push("layui-btn-".concat(props.type));
      className.push("layui-btn-".concat(props.size));
      props.fluid && className.push('layui-btn-fluid');
      props.radius && className.push('layui-btn-radius');
      var onClick = props.type === 'disabled' ? function () {} : props.onClick;
      return _createVNode("button", {
        "class": className.join(' '),
        "onClick": onClick
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));