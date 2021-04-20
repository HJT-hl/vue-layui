"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayField',
  props: {
    isRow: {
      type: Boolean,
      "default": false
    },
    marginLeft: {
      type: [Number, String],
      "default": 20
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var marginLeft = '';

      if (typeof props.marginLeft === 'number') {
        marginLeft = props.marginLeft + 'px';
      } else if (typeof props.marginLeft === 'string') {
        marginLeft = props.marginLeft;
      }

      return (0, _vue.createVNode)("fieldset", {
        "class": 'layui-elem-field ' + (props.isRow ? 'layui-field-title' : '')
      }, [(0, _vue.createVNode)("legend", {
        "style": {
          marginLeft: marginLeft
        }
      }, [slots.title && slots.title()]), (0, _vue.createVNode)("div", {
        "class": "layui-field-box"
      }, [slots.content && slots.content()])]);
    };
  }
}));

exports["default"] = _default;