/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var ModelEnum;

(function (ModelEnum) {
  ModelEnum["LEFT"] = "left";
  ModelEnum["RIGHT"] = "right";
  ModelEnum["ALTERNATE"] = "alternate";
})(ModelEnum || (ModelEnum = {}));

var Timeline = vue.defineComponent({
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

      return vue.createVNode("div", {
        "class": 'layui-timeline ' + "layui-timeline-".concat(model)
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

var index = withInstall(Timeline);

module.exports = index;
