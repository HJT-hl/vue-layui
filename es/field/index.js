import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayField',
  props: {
    isRow: {
      type: Boolean,
      "default": false
    },
    marginLeft: {
      type: [Number, String],
      "default": 20
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var marginLeft = '';

      if (typeof props.marginLeft === 'number') {
        marginLeft = props.marginLeft + 'px';
      } else if (typeof props.marginLeft === 'string') {
        marginLeft = props.marginLeft;
      }

      return _createVNode("fieldset", {
        "class": 'layui-elem-field ' + (props.isRow ? 'layui-field-title' : '')
      }, [_createVNode("legend", {
        "style": {
          marginLeft: marginLeft
        }
      }, [slots.title && slots.title()]), _createVNode("div", {
        "class": "layui-field-box"
      }, [slots.content && slots.content()])]);
    };
  }
}));