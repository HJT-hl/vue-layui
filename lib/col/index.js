"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _utils = require("../_utils/utils");

require("./style/index");

var _default = (0, _vue.defineComponent)({
  name: 'LayCol',
  props: {
    xs: Number,
    sm: Number,
    md: Number,
    lg: Number,
    xsOffset: Number,
    smOffset: Number,
    lgOffset: Number,
    mdOffset: Number
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var screenMedia = ['xs', 'sm', 'md', 'lg'];
    var offsets = ['xsOffset', 'smOffset', 'mdOffset', 'lgOffset'];
    return function () {
      var className = ['layui-col'];
      screenMedia.forEach(function (item) {
        // @ts-ignore
        if (props[item] !== undefined) {
          // @ts-ignore
          className.push("layui-col-".concat(item).concat(props[item]));
        }
      });
      offsets.forEach(function (item) {
        // @ts-ignore
        if (props[item] !== undefined) {
          var offsetName = (0, _utils.toLine)(item); // @ts-ignore

          className.push("layui-col-".concat(offsetName).concat(props[item]));
        }
      });
      return (0, _vue.createVNode)("div", {
        "class": className.join(' ')
      }, [slots["default"] && slots["default"]()]);
    };
  }
});

exports["default"] = _default;