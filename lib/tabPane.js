/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

function className(name) {
  var classs = [];

  if (name.toString() === "[object Object]") {
    for (var key in name) {
      if (name[key]) {
        classs.push(key);
      }
    }
  }

  if (Array.isArray(name)) {
    name.forEach(function (item) {
      if (typeof item === 'string') {
        classs.push(item);
      } else if (item.toString() === "[object Object]") {
        for (var _key in item) {
          if (item[_key]) {
            classs.push(_key);
          }
        }
      }
    });
  }

  return classs.join(' ');
}

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
    },
    updateTitles: {
      type: Function,
      "default": function _default() {}
    },
    show: {
      type: [String, Number],
      "default": ''
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var lastTitle = props.label;
    return function () {
      props.updateTitles(lastTitle, props.label, props.name);
      lastTitle = props.label;
      return vue.createVNode("div", {
        "class": className(['layui-tab-item', {
          'layui-show': props.show === props.name
        }])
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
