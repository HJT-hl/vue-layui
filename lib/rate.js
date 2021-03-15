/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Rate = vue.defineComponent({
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
    _ref.slots;
        var emit = _ref.emit;
    var v = vue.ref(props.modelValue);
    vue.watchEffect(function () {
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

      var solid = 0,
          half = 0;

      if (v.value !== undefined) {
        solid = v.value / max * count | 0;
        if (solid > count) solid = count;
      }

      if (allowHalf && v.value !== undefined) {
        half = Math.round(v.value / max * count - solid);
        if (solid == count) half = 0;
      }

      return vue.createVNode("div", {
        "class": 'layui-inline'
      }, [vue.createVNode("ul", {
        "class": 'layui-rate',
        "onMouseleave": mouseLeave,
        "onClick": onClick
      }, [new Array(solid).fill(true).map(function (item, index) {
        return vue.createVNode("li", {
          "class": 'layui-inline',
          "onMousemove": function onMousemove(e) {
            return mouseEnter(index, e);
          }
        }, [vue.createVNode("i", {
          "class": 'layui-icon layui-icon-rate-solid',
          "style": {
            color: color
          }
        }, null)]);
      }), half ? vue.createVNode("li", {
        "class": 'layui-inline',
        "onMousemove": function onMousemove(e) {
          return mouseEnter(solid, e);
        }
      }, [vue.createVNode("i", {
        "class": 'layui-icon layui-icon-rate-half',
        "style": {
          color: color
        }
      }, null)]) : '', new Array(count - solid - half).fill(true).map(function (item, index) {
        return vue.createVNode("li", {
          "class": 'layui-inline',
          "onMousemove": function onMousemove(e) {
            return mouseEnter(solid + index + (half ? 1 : 0), e);
          }
        }, [vue.createVNode("i", {
          "class": 'layui-icon layui-icon-rate',
          "style": {
            color: color
          }
        }, null)]);
      })]), vue.createVNode("span", {
        "class": 'layui-inline',
        "style": {
          color: textColor
        }
      }, [vue.createTextVNode(" "), showText ? text : ''])]);
    };
  }
});

var withInstall = function withInstall(comp) {
  var c = comp;

  c.install = function (app) {
    app.component(c.displayName || c.name, comp);
  };

  return comp;
};

var index = withInstall(Rate);

module.exports = index;
