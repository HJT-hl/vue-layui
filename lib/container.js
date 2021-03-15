/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Container = vue.defineComponent({
  name: 'LayContainer',
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return vue.createVNode("div", {
        "class": "layui-container"
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

var index = withInstall(Container);

module.exports = index;
