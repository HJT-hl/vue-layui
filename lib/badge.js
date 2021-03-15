/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Badge = vue.defineComponent({
  name: 'LayBadge',
  props: {
    type: {
      type: String,
      "default": ''
    },
    color: {
      type: String,
      "default": '#FF5722'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var isSlots = true;
    var className = 'layui-badge';
    var color = props.color;
    var style = {
      backgroundColor: color,
      borderColor: color
    };

    if (props.type === 'dot') {
      isSlots = false;
      className = 'layui-badge-dot';
    } else if (props.type === 'rim') {
      className = 'layui-badge-rim';
      style.backgroundColor = '#fff';
    }

    return function () {
      return vue.createVNode("div", {
        "class": className,
        "style": style
      }, [isSlots && slots["default"] && slots["default"]()]);
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

var index = withInstall(Badge);

module.exports = index;
