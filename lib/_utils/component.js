"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childAddProps = childAddProps;
exports.childrenAddProps = childrenAddProps;
exports.getChildren = getChildren;
exports.withInstall = void 0;

var _vue = require("vue");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withInstall = function withInstall(comp) {
  var c = comp;

  c.install = function (app) {
    app.component(c.displayName || c.name, comp);
  };

  return comp;
};

exports.withInstall = withInstall;

function childAddProps(child, props) {
  child.props = _objectSpread(_objectSpread({}, child.props), props);
  return child;
}

function childrenAddProps(children, props) {
  var c = [];

  for (var i = 0; i < children.length; i++) {
    if (children[i].type === _vue.Fragment) {
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

function getChildren(children, childrenName) {
  var c = [];

  if (children) {
    for (var i = 0; i < children.length; i++) {
      if (children[i].type === _vue.Fragment) {
        if (Array.isArray(children[i].children)) {
          // @ts-ignore
          var ch = children[i].children.filter(function (item) {
            return item.type.name === childrenName;
          }); // @ts-ignore

          c = [].concat(_toConsumableArray(c), _toConsumableArray(ch));
        }
      } else {
        // @ts-ignore
        if (children[i].type.name === childrenName) c.push(children[i]);
      }
    }
  }

  return c;
}