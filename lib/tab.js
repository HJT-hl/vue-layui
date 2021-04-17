/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

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

function className(name) {
  var classs = [];

  if (name.toString() === '[object Object]') {
    for (var key in name) {
      // @ts-ignore
      if (name[key]) {
        classs.push(key);
      }
    }
  }

  if (Array.isArray(name)) {
    name.forEach(function (item) {
      if (typeof item === 'string') {
        classs.push(item);
      } else if (item.toString() === '[object Object]') {
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

var withInstall = function withInstall(comp) {
  var c = comp;

  c.install = function (app) {
    app.component(c.displayName || c.name, comp);
  };

  return comp;
};
function getChildren(children, childrenName) {
  var c = [];

  if (children) {
    for (var i = 0; i < children.length; i++) {
      if (children[i].type === vue.Fragment) {
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
    var closeTab = vue.ref([]);
    return function () {
      var children = slots["default"] && slots["default"]();
      var c = getChildren(children, 'LayTabPane');

      var handleTabClick = function handleTabClick(tabbar) {
        emit('update:modelValue', tabbar.name);
        props.onClick && props.onClick(tabbar);
      };

      var displayTab = c.filter(function (_ref2) {
        var p = _ref2.props;
        return !closeTab.value.find(function (close) {
          return p.name === close.name;
        });
      });

      var handleTabClose = function handleTabClose(e, tabbar) {
        e.stopPropagation();

        if (tabbar.name === props.modelValue) {
          var index = displayTab.findIndex(function (_ref3) {
            var p = _ref3.props;
            return tabbar.name === p.name;
          });

          if (displayTab[index + 1]) {
            emit('update:modelValue', displayTab[index + 1].props.name);
          } else if (displayTab[index - 1]) {
            emit('update:modelValue', displayTab[index - 1].props.name);
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
      }; // @ts-ignore

      return vue.createVNode("div", {
        "style": style,
        "class": className(['layui-tab', {
          'layui-tab-brief': props.type === 'brief',
          'layui-tab-card': props.type === 'card'
        }])
      }, [vue.createVNode("ul", {
        "class": 'layui-tab-title'
      }, [displayTab.map(function (_ref4) {
        var p = _ref4.props;
        return vue.createVNode("li", {
          "class": className({
            'layui-this': p.name === props.modelValue
          }),
          "onClick": function onClick() {
            return handleTabClick(p);
          }
        }, [p.label, props.closable && vue.createVNode("i", {
          "class": 'layui-icon  layui-tab-close',
          "onClick": function onClick(e) {
            return handleTabClose(e, p);
          }
        }, [vue.createTextVNode("\u1006")])]);
      })]), displayTab.find(function (_ref5) {
        var p = _ref5.props;
        return p.name === props.modelValue;
      })]);
    };
  }
});

var index = withInstall(Tab);

module.exports = index;
