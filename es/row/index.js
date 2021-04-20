import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayRow',
  props: {
    colSpace: Number
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var style = {};

      if (props.colSpace !== undefined) {
        style = {
          '--m': -1 * props.colSpace / 2 + 'px',
          '--p': props.colSpace / 2 + 'px'
        };
      }

      return _createVNode("div", {
        "class": 'layui-row space',
        "style": style
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));