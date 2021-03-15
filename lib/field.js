/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var Field = vue.defineComponent({
  name: 'LayField',
  props: {
    isRow: {
      type: Boolean,
      "default": false
    },
    marginLeft: {
      type: [Number, String],
      "default": 20
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var marginLeft = '';

      if (typeof props.marginLeft === 'number') {
        marginLeft = props.marginLeft + 'px';
      } else if (typeof props.marginLeft === 'string') {
        marginLeft = props.marginLeft;
      }

      return vue.createVNode("fieldset", {
        "class": 'layui-elem-field ' + (props.isRow ? 'layui-field-title' : '')
      }, [vue.createVNode("legend", {
        "style": {
          marginLeft: marginLeft
        }
      }, [slots.title && slots.title()]), vue.createVNode("div", {
        "class": "layui-field-box"
      }, [slots.content && slots.content()])]);
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

var index = withInstall(Field);

module.exports = index;
