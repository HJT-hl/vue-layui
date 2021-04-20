import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import './style/index';
export default defineComponent({
  name: 'LayIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      "default": 16
    },
    color: {
      type: String,
      "default": ''
    }
  },
  setup: function setup(props) {
    return function () {
      var icon = "layui-icon-".concat(props.icon);
      return _createVNode("i", {
        "class": 'layui-icon ' + icon,
        "style": {
          fontSize: props.size + 'px',
          color: props.color
        }
      }, null);
    };
  }
});