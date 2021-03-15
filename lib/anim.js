/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Anim = vue.defineComponent({
  name: 'LayAnim',
  props: {
    animate: {
      type: String,
      required: true
    },
    trigger: {
      type: Boolean,
      "default": true
    },
    loop: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var anim = '';

      if (props.trigger) {
        anim = "layui-anim-".concat(props.animate, " ");
        if (props.loop) anim += 'layui-anim-loop';
      }

      return vue.createVNode("div", {
        "class": 'layui-anim ' + anim
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

var index = withInstall(Anim);

module.exports = index;
