"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayRate',
  props: {
    modelValue: {
      type: Number
    },
    max: {
      type: Number,
      "default": 5
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    showText: {
      type: Boolean,
      "default": false
    },
    text: {
      type: String,
      "default": ''
    },
    textColor: {
      ype: String,
      "default": ''
    },
    allowHalf: {
      type: Boolean,
      "default": false
    },
    color: {
      type: String,
      "default": ''
    },
    count: {
      type: Number,
      "default": 5
    },
    onHoverChange: Function,
    onChange: Function
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var v = (0, _vue.ref)(props.modelValue);
    (0, _vue.watchEffect)(function () {
      v.value = props.modelValue;
    });
    return function () {
      var allowHalf = props.allowHalf,
          count = props.count,
          max = props.max,
          color = props.color,
          text = props.text,
          textColor = props.textColor,
          showText = props.showText,
          readonly = props.readonly,
          onHoverChange = props.onHoverChange,
          onChange = props.onChange;

      var mouseEnter = function mouseEnter(index, e) {
        if (readonly) return;
        var lastValue = v.value;

        if (allowHalf) {
          v.value = (index + (e.offsetX >= 10 ? 1 : 0.5)) / count * max;
        } else {
          v.value = (index + 1) / count * max;
        }

        if (onHoverChange && lastValue !== v.value) onHoverChange(v.value);
      };

      var mouseLeave = function mouseLeave() {
        if (props.modelValue !== undefined) {
          if (allowHalf) {
            v.value = (props.modelValue / (max / count / 2) | 0) * (max / count / 2);
          } else {
            v.value = (props.modelValue / (max / count) | 0) * (max / count);
          }

          if (onHoverChange) onHoverChange(v.value);
        }
      };

      var onClick = function onClick() {
        emit('update:modelValue', v.value);
        onChange && v.value !== undefined && onChange(v.value);
      };

      var solid = 0;
      var half = 0;

      if (v.value !== undefined) {
        solid = v.value / max * count | 0;
        if (solid > count) solid = count;
      }

      if (allowHalf && v.value !== undefined) {
        half = Math.round(v.value / max * count - solid);
        if (solid === count) half = 0;
      }

      return (0, _vue.createVNode)("div", {
        "class": 'layui-inline'
      }, [(0, _vue.createVNode)("ul", {
        "class": 'layui-rate',
        "onMouseleave": mouseLeave,
        "onClick": onClick
      }, [new Array(solid).fill(true).map(function (item, index) {
        return (0, _vue.createVNode)("li", {
          "class": 'layui-inline',
          "onMousemove": function onMousemove(e) {
            return mouseEnter(index, e);
          }
        }, [(0, _vue.createVNode)("i", {
          "class": 'layui-icon layui-icon-rate-solid',
          "style": {
            color: color
          }
        }, null)]);
      }), half ? (0, _vue.createVNode)("li", {
        "class": 'layui-inline',
        "onMousemove": function onMousemove(e) {
          return mouseEnter(solid, e);
        }
      }, [(0, _vue.createVNode)("i", {
        "class": 'layui-icon layui-icon-rate-half',
        "style": {
          color: color
        }
      }, null)]) : '', new Array(count - solid - half).fill(true).map(function (item, index) {
        return (0, _vue.createVNode)("li", {
          "class": 'layui-inline',
          "onMousemove": function onMousemove(e) {
            return mouseEnter(solid + index + (half ? 1 : 0), e);
          }
        }, [(0, _vue.createVNode)("i", {
          "class": 'layui-icon layui-icon-rate',
          "style": {
            color: color
          }
        }, null)]);
      })]), (0, _vue.createVNode)("span", {
        "class": 'layui-inline',
        "style": {
          color: textColor
        }
      }, [(0, _vue.createTextVNode)(" "), showText ? text : ''])]);
    };
  }
}));

exports["default"] = _default;