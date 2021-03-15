/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Quote = vue.defineComponent({
  name: 'LayQuote',
  props: {
    color: {
      type: String,
      "default": ''
    },
    leftColor: {
      type: String,
      "default": ''
    },
    nm: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var color = props.color,
          leftColor = props.leftColor,
          nm = props.nm;
      var style = {};

      if (nm) {
        style = {
          borderColor: color,
          borderLeftColor: leftColor
        };
      } else {
        style = {
          backgroundColor: color,
          borderLeftColor: leftColor
        };
      }

      return vue.createVNode("blockquote", {
        "class": 'layui-elem-quote ' + (nm ? 'layui-quote-nm' : ''),
        "style": style
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

var index = withInstall(Quote);

module.exports = index;
