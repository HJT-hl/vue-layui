/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var TabPane = vue.defineComponent({
  name: 'LayTabPane',
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      "default": ''
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return vue.createVNode("div", {
        "class": "layui-tab-content"
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

var index = withInstall(TabPane);

module.exports = index;
