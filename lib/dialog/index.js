"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayButtonContainer',
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return (0, _vue.createVNode)("div", {
        "class": 'layui-layer layui-layer-dialog'
      }, null);
    };
  }
}));

exports["default"] = _default;