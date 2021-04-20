"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _utils = require("../_utils/utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0, _vue.isVNode)(s);
}

var _default2 = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayCollapse',
  props: {
    modelValue: {
      type: [Array, String, Number]
    },
    'onUpdate:modelValue': {
      type: Function
    },
    onChange: {
      type: Function
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    return function () {
      var collapseItemClick = function collapseItemClick(name) {
        var newName;

        if (Array.isArray(props.modelValue)) {
          newName = (0, _utils.triggerElement)(props.modelValue, name); // proxy to array

          props.onChange && props.onChange(_toConsumableArray(newName));
        } else {
          if (props.modelValue === name) newName = '';else newName = name;
          props.onChange && props.onChange(newName);
        }

        emit('update:modelValue', newName);
      };

      var children = slots["default"] && slots["default"]();

      if (children) {
        children = (0, _component.childrenAddProps)(children, {
          onCollapseItemClick: collapseItemClick,
          activeName: props.modelValue
        });
      }

      return (0, _vue.createVNode)("div", {
        "class": "layui-collapse"
      }, _isSlot(children) ? children : {
        "default": function _default() {
          return [children];
        }
      });
    };
  }
}));

exports["default"] = _default2;