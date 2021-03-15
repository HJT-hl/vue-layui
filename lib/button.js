/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var emptyFun = function emptyFun() {// 空函数
};

var Button = vue.defineComponent({
  name: 'LayButton',
  props: {
    type: {
      type: String,
      "default": ''
    },
    onClick: {
      type: Function,
      "default": emptyFun
    },
    size: {
      type: String,
      "default": ''
    },
    fluid: {
      type: Boolean,
      "default": false
    },
    radius: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var className = ['layui-btn '];
      className.push("layui-btn-".concat(props.type));
      className.push("layui-btn-".concat(props.size));
      props.fluid && className.push('layui-btn-fluid');
      props.radius && className.push('layui-btn-radius');
      var onClick = props.type === 'disabled' ? emptyFun : props.onClick;
      return vue.createVNode("button", {
        "class": className.join(' '),
        "onClick": onClick
      }, [slots["default"] && slots["default"]()]);
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

var index = withInstall(Button);

module.exports = index;
