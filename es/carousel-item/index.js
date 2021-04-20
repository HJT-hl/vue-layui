import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
  name: 'LayCarouselItem',
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return _createVNode("div", {
        "class": 'layui-carousel-item'
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));