/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var CollapseItem = vue.defineComponent({
  name: 'LayCollapseItem',
  props: {
    name: {
      type: String,
      required: true
    },
    activeName: {
      type: [Array, String]
    },
    onCollapseItemClick: {
      type: Function
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var activeName = props.activeName,
          name = props.name,
          onCollapseItemClick = props.onCollapseItemClick;
      var isOpen = false;

      if (Array.isArray(activeName)) {
        isOpen = activeName.includes(name);
      } else {
        isOpen = activeName === name;
      }

      return vue.createVNode("div", {
        "class": "layui-colla-item",
        "onClick": function onClick() {
          return onCollapseItemClick && onCollapseItemClick(name);
        }
      }, [vue.createVNode("div", {
        "class": "layui-colla-title"
      }, [vue.createVNode("i", {
        "class": 'layui-colla-icon ' + (isOpen ? 'layui-colla-icon-open' : '')
      }, [vue.createTextVNode("\uE602")]), slots.title && slots.title()]), vue.createVNode("div", {
        "class": 'layui-colla-content layui-show ' + (isOpen ? '' : 'layui-colla-close')
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

var index = withInstall(CollapseItem);

module.exports = index;
