/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');
var Button = require('./button');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);

var buttonContainer = vue.defineComponent({
  name: 'LayButtonContainer',
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      return vue.createVNode("div", {
        "class": 'layui-btn-container'
      }, [slots["default"] && slots["default"](), vue.createVNode(Button__default['default'], null, {
        "default": function _default() {
          return [vue.createTextVNode("\u884C\u4E0D\u884C")];
        }
      })]);
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

var index = withInstall(buttonContainer);

module.exports = index;
