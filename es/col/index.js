import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { toLine } from '../_utils/utils';
import './style/index';
export default defineComponent({
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
      return _createVNode("div", {
        "class": className.join(' ')
      }, [slots["default"] && slots["default"]()]);
    };
  }
});