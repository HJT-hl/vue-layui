/* * Copyright © 2019-2021 chenwenbin * Released under the MIT License. */
'use strict';

var vue = require('vue');

//
var script = vue.defineComponent({
  name: 'vuew',
 
});
 var _withId = /*#__PURE__*/vue.withScopeId("data-v-28eca9f4");
 var render = /*#__PURE__*/_withId((_ctx, _cache) => {
  return (vue.openBlock(), vue.createBlock("div", null, "214"))
});

script.render = render;
script.__scopeId = "data-v-28eca9f4";
script.__file = "packages/vuew/src/vuew.vue";

script.install = function (app) {
  app.component(script.name, script);
};

module.exports = script;
