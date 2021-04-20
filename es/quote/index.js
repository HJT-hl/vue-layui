import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayQuote',
  props: {
    color: {
      type: String,
      "default": ''
    },
    leftColor: {
      type: String,
      "default": ''
    },
    nm: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var color = props.color,
          leftColor = props.leftColor,
          nm = props.nm;
      var style = {};

      if (nm) {
        style = {
          borderColor: color,
          borderLeftColor: leftColor
        };
      } else {
        style = {
          backgroundColor: color,
          borderLeftColor: leftColor
        };
      }

      return _createVNode("blockquote", {
        "class": 'layui-elem-quote ' + (nm ? 'layui-quote-nm' : ''),
        "style": style
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));