/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

function className(name) {
  var classs = [];

  if (name.toString() === "[object Object]") {
    for (var key in name) {
      if (name[key]) {
        classs.push(key);
      }
    }
  }

  if (Array.isArray(name)) {
    name.forEach(function (item) {
      if (typeof item === 'string') {
        classs.push(item);
      } else if (item.toString() === "[object Object]") {
        for (var _key in item) {
          if (item[_key]) {
            classs.push(_key);
          }
        }
      }
    });
  }

  return classs.join(' ');
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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
    if (_typeof(children[i].type) === 'symbol') {
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

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !vue.isVNode(s);
}

var Tab = vue.defineComponent({
  name: 'LayTab',
  props: {
    modelValue: {
      type: [String, Number],
      "default": ''
    },
    type: {
      type: String,
      "default": ''
    },
    closable: {
      type: Boolean,
      "default": false
    },
    onClick: {
      type: Function
    },
    onRemove: {
      type: Function
    },
    briefColor: {
      type: Array,
      "default": ['#009688', '#5FB878']
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var titles = vue.ref([]);
    var closeTab = vue.ref([]);
    return function () {
      var updateTitles = function updateTitles(lastTitle, newtitle, name) {
        if (!titles.value.find(function (item) {
          return item.label === lastTitle;
        })) titles.value.push({
          label: lastTitle,
          name: name
        });else if (lastTitle !== newtitle) {
          titles.value = titles.value.map(function (item) {
            if (item.label === lastTitle) return {
              label: newtitle,
              name: name
            };
            return item;
          });
        }
      };

      var children = slots["default"] && slots["default"]();

      if (children) {
        childrenAddProps(children, {
          updateTitles: updateTitles,
          show: props.modelValue
        });
      }

      var handleTabClick = function handleTabClick(tabbar) {
        emit('update:modelValue', tabbar.name);
        props.onClick && props.onClick(tabbar);
      };

      var displayTab = titles.value.filter(function (item) {
        return !closeTab.value.find(function (close) {
          return item.name === close.name;
        });
      });

      var handleTabClose = function handleTabClose(e, tabbar) {
        e.stopPropagation();

        if (tabbar.name === props.modelValue) {
          var index = displayTab.findIndex(function (item) {
            return tabbar.name === item.name;
          });

          if (displayTab[index + 1]) {
            emit('update:modelValue', displayTab[index + 1].name);
          } else if (displayTab[index - 1]) {
            emit('update:modelValue', displayTab[index - 1].name);
          } else {
            emit('update:modelValue', '');
          }
        }

        props.onRemove && props.onRemove(tabbar);
        closeTab.value.push(tabbar);
      };

      var style = {
        '--brief-font--': props.briefColor[0],
        '--brief-underline--': props.briefColor[1]
      };
      return vue.createVNode("div", {
        "style": style,
        "class": className(['layui-tab', {
          'layui-tab-brief': props.type === 'brief',
          'layui-tab-card': props.type === 'card'
        }])
      }, [vue.createVNode("ul", {
        "class": 'layui-tab-title'
      }, [displayTab.map(function (item) {
        return vue.createVNode("li", {
          "class": className({
            'layui-this': item.name === props.modelValue
          }),
          "onClick": function onClick() {
            return handleTabClick(item);
          }
        }, [item.label, props.closable && vue.createVNode("i", {
          "class": 'layui-icon  layui-tab-close',
          "onClick": function onClick(e) {
            return handleTabClose(e, item);
          }
        }, [vue.createTextVNode("\u1006")])]);
      })]), vue.createVNode("div", {
        "class": "layui-tab-content"
      }, _isSlot(children) ? children : {
        "default": function _default() {
          return [children];
        }
      })]);
    };
  }
});

var index = withInstall(Tab);

module.exports = index;
