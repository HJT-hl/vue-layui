/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Card = vue.defineComponent({
  name: 'LayCard',
  props: {
    shadow: {
      type: String,
      "default": 'never'
    },
    // @ts-ignore
    bodyStyle: {
      type: [String, Object],
      "default": {
        padding: '20px'
      }
    }
  },
  // @ts-ignore
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var shadowClass = '';
      if (props.shadow === 'always') shadowClass = 'layui-card-always-shadow';else if (props.shadow === 'hover') shadowClass = 'layui-card-hover-shadow';
      return vue.createVNode("div", {
        "class": 'layui-card ' + shadowClass
      }, [vue.createVNode("div", {
        "class": "layui-card-header"
      }, [slots.header && slots.header()]), vue.createVNode("div", {
        "class": "layui-card-body",
        "style": props.bodyStyle
      }, [slots.body && slots.body()])]);
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

var index = withInstall(Card);

module.exports = index;
