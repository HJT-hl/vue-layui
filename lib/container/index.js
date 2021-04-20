"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

// TODO : 流体元素
var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayContainer',
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return (0, _vue.createVNode)("div", {
        "class": "layui-container"
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));

exports["default"] = _default;