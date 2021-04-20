import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
var ModelEnum;

(function (ModelEnum) {
  ModelEnum["LEFT"] = "left";
  ModelEnum["RIGHT"] = "right";
  ModelEnum["ALTERNATE"] = "alternate";
})(ModelEnum || (ModelEnum = {}));

export default withInstall(defineComponent({
  name: 'LayTimeline',
  props: {
    model: {
      type: String,
      "default": ModelEnum.LEFT
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var model = props.model; // @ts-ignore

      if (model !== ModelEnum.RIGHT || model !== ModelEnum.ALTERNATE) {
        model = ModelEnum.LEFT;
      }

      return _createVNode("div", {
        "class": 'layui-timeline ' + "layui-timeline-".concat(model)
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));