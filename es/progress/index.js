import { createVNode as _createVNode, isVNode as _isVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default withInstall(defineComponent({
  name: 'LayProgress',
  props: {
    value: {
      type: Number,
      required: true
    },
    isBig: {
      type: Boolean,
      "default": false
    },
    showPercent: {
      type: Boolean,
      "default": false
    },
    color: {
      type: String,
      "default": ''
    },
    textStyle: {
      type: [String, Object],
      "default": ''
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var value = props.value,
          isBig = props.isBig,
          showPercent = props.showPercent,
          color = props.color,
          textStyle = props.textStyle;
      var text = value * 100 + '%';
      return _createVNode("div", {
        "class": 'layui-progress ' + (isBig ? 'layui-progress-big' : '')
      }, [_createVNode("div", {
        "class": "layui-progress-bar",
        "style": {
          width: text,
          backgroundColor: color
        }
      }, [showPercent ? _createVNode("span", {
        "class": 'layui-progress-text',
        "style": textStyle
      }, _isSlot(text) ? text : {
        "default": function _default() {
          return [text];
        }
      }) : ''])]);
    };
  }
}));