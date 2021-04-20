"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayTimelineItem',
  props: {
    title: {
      type: String,
      required: true
    },
    titleStyle: {
      type: [String, Object],
      "default": ''
    },
    iconColor: {
      type: String,
      "default": ''
    },
    lineColor: {
      type: String,
      "default": '#e6e6e6'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var style = {
        '--line-color': props.lineColor
      };
      return (0, _vue.createVNode)("div", {
        "class": "layui-timeline-item",
        "style": style
      }, [(0, _vue.createVNode)("div", {
        "class": 'layui-timeline-axis',
        "style": {
          color: props.iconColor
        }
      }, [slots.icon ? slots.icon() : (0, _vue.createVNode)("i", {
        "class": "layui-icon",
        "style": {
          height: '20px',
          width: '20px'
        }
      }, [(0, _vue.createTextVNode)("\uE63F")])]), (0, _vue.createVNode)("div", {
        "class": "layui-timeline-content layui-text"
      }, [(0, _vue.createVNode)("div", {
        "class": "layui-timeline-title",
        "style": props.titleStyle
      }, [props.title]), slots["default"] && slots["default"]()])]);
    };
  }
}));

exports["default"] = _default;