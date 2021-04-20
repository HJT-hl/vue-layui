"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayQuote',
  props: {
    color: {
      type: String,
      "default": ''
    },
    leftColor: {
      type: String,
      "default": ''
    },
    nm: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var color = props.color,
          leftColor = props.leftColor,
          nm = props.nm;
      var style = {};

      if (nm) {
        style = {
          borderColor: color,
          borderLeftColor: leftColor
        };
      } else {
        style = {
          backgroundColor: color,
          borderLeftColor: leftColor
        };
      }

      return (0, _vue.createVNode)("blockquote", {
        "class": 'layui-elem-quote ' + (nm ? 'layui-quote-nm' : ''),
        "style": style
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));

exports["default"] = _default;