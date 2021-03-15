/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Row = vue.defineComponent({
  name: 'LayRow',
  props: {
    colSpace: Number
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var style = {};

      if (props.colSpace !== undefined) {
        style = {
          '--m': -1 * props.colSpace / 2 + 'px',
          '--p': props.colSpace / 2 + 'px'
        };
      }

      return vue.createVNode("div", {
        "class": 'layui-row space',
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

var index = withInstall(Row);

module.exports = index;
