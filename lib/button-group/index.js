"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

require("./style/index");

var _default = (0, _vue.defineComponent)({
  name: 'LayButtonGroup',
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return (0, _vue.createVNode)("div", {
        "class": 'layui-btn-group'
      }, [slots["default"] && slots["default"]()]);
    };
  }
});

exports["default"] = _default;