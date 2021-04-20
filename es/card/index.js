import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayCard',
  props: {
    shadow: {
      type: String,
      "default": 'never'
    },
    // @ts-ignore
    bodyStyle: {
      type: [String, Object],
      "default": {
        padding: '20px'
      }
    }
  },
  // @ts-ignore
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var shadowClass = '';
      if (props.shadow === 'always') shadowClass = 'layui-card-always-shadow';else if (props.shadow === 'hover') shadowClass = 'layui-card-hover-shadow';
      return _createVNode("div", {
        "class": 'layui-card ' + shadowClass
      }, [_createVNode("div", {
        "class": "layui-card-header"
      }, [slots.header && slots.header()]), _createVNode("div", {
        "class": "layui-card-body",
        "style": props.bodyStyle
      }, [slots.body && slots.body()])]);
    };
  }
}));