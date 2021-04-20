"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0, _vue.isVNode)(s);
}

var _default2 = (0, _component.withInstall)((0, _vue.defineComponent)({
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
      return (0, _vue.createVNode)("div", {
        "class": 'layui-progress ' + (isBig ? 'layui-progress-big' : '')
      }, [(0, _vue.createVNode)("div", {
        "class": "layui-progress-bar",
        "style": {
          width: text,
          backgroundColor: color
        }
      }, [showPercent ? (0, _vue.createVNode)("span", {
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

exports["default"] = _default2;