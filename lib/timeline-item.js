/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var TimelineItem = vue.defineComponent({
  name: 'LayTimeLineItem',
  props: {
    title: {
      type: String,
      required: true
    },
    titleStyle: {
      type: [String, Object],
      "default": ''
    },
    iconColor: {
      type: String,
      "default": ''
    },
    lineColor: {
      type: String,
      "default": '#e6e6e6'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var style = {
        '--line-color': props.lineColor
      };
      return vue.createVNode("div", {
        "class": "layui-timeline-item",
        "style": style
      }, [vue.createVNode("div", {
        "class": 'layui-timeline-axis',
        "style": {
          color: props.iconColor
        }
      }, [slots.icon ? slots.icon() : vue.createVNode("i", {
        "class": "layui-icon",
        "style": {
          height: '20px',
          width: '20px'
        }
      }, [vue.createTextVNode("\uE63F")])]), vue.createVNode("div", {
        "class": "layui-timeline-content layui-text"
      }, [vue.createVNode("div", {
        "class": "layui-timeline-title",
        "style": props.titleStyle
      }, [props.title]), slots["default"] && slots["default"]()])]);
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

var index = withInstall(TimelineItem);

module.exports = index;
