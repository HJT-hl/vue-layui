/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var toLine = function toLine(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};

var Col = vue.defineComponent({
  name: 'LayCol',
  props: {
    xs: Number,
    sm: Number,
    md: Number,
    lg: Number,
    xsOffset: Number,
    smOffset: Number,
    lgOffset: Number,
    mdOffset: Number
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var screenMedia = ['xs', 'sm', 'md', 'lg'];
    var offsets = ['xsOffset', 'smOffset', 'mdOffset', 'lgOffset'];
    return function () {
      var className = ['layui-col'];
      screenMedia.forEach(function (item) {
        // @ts-ignore
        if (props[item] !== undefined) {
          // @ts-ignore
          className.push("layui-col-".concat(item).concat(props[item]));
        }
      });
      offsets.forEach(function (item) {
        // @ts-ignore
        if (props[item] !== undefined) {
          var offsetName = toLine(item); // @ts-ignore

          className.push("layui-col-".concat(offsetName).concat(props[item]));
        }
      });
      return vue.createVNode("div", {
        "class": className.join(' ')
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

var index = withInstall(Col);

module.exports = index;
