/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
import { defineComponent, openBlock, createBlock, withScopeId } from 'vue';

//
var script = defineComponent({
  name: 'vuew',
});
 var _withId = /*#__PURE__*/withScopeId("data-v-28eca9f4");
 var render = /*#__PURE__*/_withId((_ctx, _cache) => {
  return (openBlock(), createBlock("div", null, "214"))
});

script.render = render;
script.__scopeId = "data-v-28eca9f4";
script.__file = "packages/vuew/src/vuew.vue";

script.install = function (app) {
  app.component(script.name, script);
};

export default script;
