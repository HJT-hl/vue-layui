"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayRow',
  props: {
    colSpace: Number
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var style = {};

      if (props.colSpace !== undefined) {
        style = {
          '--m': -1 * props.colSpace / 2 + 'px',
          '--p': props.colSpace / 2 + 'px'
        };
      }

      return (0, _vue.createVNode)("div", {
        "class": 'layui-row space',
        "style": style
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));

exports["default"] = _default;