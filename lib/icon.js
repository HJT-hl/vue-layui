/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Icon = vue.defineComponent({
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
      return vue.createVNode("i", {
        "class": 'layui-icon ' + icon,
        "style": {
          fontSize: props.size + 'px',
          color: props.color
        }
      }, null);
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

var index = withInstall(Icon);

module.exports = index;
