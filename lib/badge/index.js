"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
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
      return (0, _vue.createVNode)("div", {
        "class": className,
        "style": style
      }, [isSlots && slots["default"] && slots["default"]()]);
    };
  }
}));

exports["default"] = _default;