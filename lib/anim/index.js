"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayAnim',
  props: {
    animate: {
      type: String,
      required: true
    },
    trigger: {
      type: Boolean,
      "default": true
    },
    loop: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var anim = '';

      if (props.trigger) {
        anim = "layui-anim-".concat(props.animate, " ");
        if (props.loop) anim += 'layui-anim-loop';
      }

      return (0, _vue.createVNode)("div", {
        "class": 'layui-anim ' + anim
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));

exports["default"] = _default;