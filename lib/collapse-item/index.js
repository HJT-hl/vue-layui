"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayCollapseItem',
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    activeName: {
      type: [Array, String, Number]
    },
    onCollapseItemClick: {
      type: Function
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var activeName = props.activeName,
          name = props.name,
          onCollapseItemClick = props.onCollapseItemClick;
      var isOpen = false;

      if (Array.isArray(activeName)) {
        // @ts-ignore
        isOpen = activeName.includes(name);
      } else {
        isOpen = activeName === name;
      }

      return (0, _vue.createVNode)("div", {
        "class": "layui-colla-item",
        "onClick": function onClick() {
          return onCollapseItemClick && onCollapseItemClick(name);
        }
      }, [(0, _vue.createVNode)("div", {
        "class": "layui-colla-title"
      }, [(0, _vue.createVNode)("i", {
        "class": 'layui-colla-icon ' + (isOpen ? 'layui-colla-icon-open' : '')
      }, [(0, _vue.createTextVNode)("\uE602")]), slots.title && slots.title()]), (0, _vue.createVNode)("div", {
        "class": 'layui-colla-content layui-show ' + (isOpen ? '' : 'layui-colla-close')
      }, [slots.content && slots.content()])]);
    };
  }
}));

exports["default"] = _default;