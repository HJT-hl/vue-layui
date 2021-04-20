"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

require("./style/index");

var _default = (0, _vue.defineComponent)({
  name: 'LayIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      "default": 16
    },
    color: {
      type: String,
      "default": ''
    }
  },
  setup: function setup(props) {
    return function () {
      var icon = "layui-icon-".concat(props.icon);
      return (0, _vue.createVNode)("i", {
        "class": 'layui-icon ' + icon,
        "style": {
          fontSize: props.size + 'px',
          color: props.color
        }
      }, null);
    };
  }
});

exports["default"] = _default;