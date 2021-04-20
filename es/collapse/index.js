import { createVNode as _createVNode, isVNode as _isVNode } from "vue";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
import { childrenAddProps } from '../_utils/component';
import { triggerElement } from '../_utils/utils';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default withInstall(defineComponent({
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
          newName = triggerElement(props.modelValue, name); // proxy to array

          props.onChange && props.onChange(_toConsumableArray(newName));
        } else {
          if (props.modelValue === name) newName = '';else newName = name;
          props.onChange && props.onChange(newName);
        }

        emit('update:modelValue', newName);
      };

      var children = slots["default"] && slots["default"]();

      if (children) {
        children = childrenAddProps(children, {
          onCollapseItemClick: collapseItemClick,
          activeName: props.modelValue
        });
      }

      return _createVNode("div", {
        "class": "layui-collapse"
      }, _isSlot(children) ? children : {
        "default": function _default() {
          return [children];
        }
      });
    };
  }
}));