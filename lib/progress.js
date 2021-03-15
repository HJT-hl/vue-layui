/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !vue.isVNode(s);
}

var Progress = vue.defineComponent({
  name: 'LayProgress',
  props: {
    value: {
      type: Number,
      required: true
    },
    isBig: {
      type: Boolean,
      "default": false
    },
    showPercent: {
      type: Boolean,
      "default": false
    },
    color: {
      type: String,
      "default": ''
    },
    textStyle: {
      type: [String, Object],
      "default": ''
    }
  },
  setup: function setup(props, _ref) {
    _ref.slots;
    return function () {
      var value = props.value,
          isBig = props.isBig,
          showPercent = props.showPercent,
          color = props.color,
          textStyle = props.textStyle;
      var text = value * 100 + '%';
      return vue.createVNode("div", {
        "class": 'layui-progress ' + (isBig ? 'layui-progress-big' : '')
      }, [vue.createVNode("div", {
        "class": "layui-progress-bar",
        "style": {
          width: text,
          backgroundColor: color
        }
      }, [showPercent ? vue.createVNode("span", {
        "class": 'layui-progress-text',
        "style": textStyle
      }, _isSlot(text) ? text : {
        "default": function _default() {
          return [text];
        }
      }) : ''])]);
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

var index = withInstall(Progress);

module.exports = index;
