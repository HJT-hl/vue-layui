"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default2 = (0, _component.withInstall)((0, _vue.defineComponent)({
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
      return (0, _vue.createVNode)("button", {
        "class": className.join(' '),
        "onClick": onClick
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));

exports["default"] = _default2;