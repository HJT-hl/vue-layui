import { createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayCollapseItem',
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    activeName: {
      type: [Array, String, Number]
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
        // @ts-ignore
        isOpen = activeName.includes(name);
      } else {
        isOpen = activeName === name;
      }

      return _createVNode("div", {
        "class": "layui-colla-item",
        "onClick": function onClick() {
          return onCollapseItemClick && onCollapseItemClick(name);
        }
      }, [_createVNode("div", {
        "class": "layui-colla-title"
      }, [_createVNode("i", {
        "class": 'layui-colla-icon ' + (isOpen ? 'layui-colla-icon-open' : '')
      }, [_createTextVNode("\uE602")]), slots.title && slots.title()]), _createVNode("div", {
        "class": 'layui-colla-content layui-show ' + (isOpen ? '' : 'layui-colla-close')
      }, [slots.content && slots.content()])]);
    };
  }
}));