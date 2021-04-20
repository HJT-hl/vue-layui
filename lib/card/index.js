"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
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
      return (0, _vue.createVNode)("div", {
        "class": 'layui-card ' + shadowClass
      }, [(0, _vue.createVNode)("div", {
        "class": "layui-card-header"
      }, [slots.header && slots.header()]), (0, _vue.createVNode)("div", {
        "class": "layui-card-body",
        "style": props.bodyStyle
      }, [slots.body && slots.body()])]);
    };
  }
}));

exports["default"] = _default;