import { createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayTimelineItem',
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
      return _createVNode("div", {
        "class": "layui-timeline-item",
        "style": style
      }, [_createVNode("div", {
        "class": 'layui-timeline-axis',
        "style": {
          color: props.iconColor
        }
      }, [slots.icon ? slots.icon() : _createVNode("i", {
        "class": "layui-icon",
        "style": {
          height: '20px',
          width: '20px'
        }
      }, [_createTextVNode("\uE63F")])]), _createVNode("div", {
        "class": "layui-timeline-content layui-text"
      }, [_createVNode("div", {
        "class": "layui-timeline-title",
        "style": props.titleStyle
      }, [props.title]), slots["default"] && slots["default"]()])]);
    };
  }
}));