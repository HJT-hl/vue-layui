"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var ModelEnum;

(function (ModelEnum) {
  ModelEnum["LEFT"] = "left";
  ModelEnum["RIGHT"] = "right";
  ModelEnum["ALTERNATE"] = "alternate";
})(ModelEnum || (ModelEnum = {}));

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
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

      return (0, _vue.createVNode)("div", {
        "class": 'layui-timeline ' + "layui-timeline-".concat(model)
      }, [slots["default"] && slots["default"]()]);
    };
  }
}));

exports["default"] = _default;