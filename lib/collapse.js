/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var withInstall = function withInstall(comp) {
  var c = comp;

  c.install = function (app) {
    app.component(c.displayName || c.name, comp);
  };

  return comp;
};
function childAddProps(child, props) {
  child.props = _objectSpread2(_objectSpread2({}, child.props), props);
  return child;
}
function childrenAddProps(children, props) {
  var c = [];

  for (var i = 0; i < children.length; i++) {
    if (children[i].type === vue.Fragment) {
      if (Array.isArray(children[i].children)) {
        // @ts-ignore
        c.push.apply(c, _toConsumableArray(children[i].children.map(function (child) {
          return childAddProps(child, props);
        })));
      }
    } else {
      c.push(childAddProps(children[i], props));
    }
  }

  return c;
}

function triggerElement(arr, item) {
  var index = arr.indexOf(item);

  if (index === -1) {
    arr.push(item);
  } else {
    arr.splice(index, 1);
  }

  return arr;
}

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !vue.isVNode(s);
}

var Collapse = vue.defineComponent({
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

      return vue.createVNode("div", {
        "class": "layui-collapse"
      }, _isSlot(children) ? children : {
        "default": function _default() {
          return [children];
        }
      });
    };
  }
});

var index = withInstall(Collapse);

module.exports = index;
