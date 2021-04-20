"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _propsType = _interopRequireDefault(require("./propsType"));

var _utils = require("../_utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayTransfer',
  props: _propsType["default"],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var data = props.data,
        modelValue = props.modelValue,
        onChange = props.onChange;
    data = (0, _utils.deepCopy)(data);
    var leftSearchKey = (0, _vue.ref)("");
    var rightSearchKey = (0, _vue.ref)("");
    var leftItem = (0, _vue.ref)(data.filter(function (item) {
      return !modelValue.includes(item.value);
    }));
    var rightItem = (0, _vue.ref)(data.filter(function (item) {
      return modelValue.includes(item.value);
    }));
    var leftSearchItem = (0, _vue.computed)(function () {
      return leftItem.value.filter(function (item) {
        return item.title.includes(leftSearchKey.value);
      });
    });
    var rightSearchItem = (0, _vue.computed)(function () {
      return rightItem.value.filter(function (item) {
        return item.title.includes(rightSearchKey.value);
      });
    });
    var leftChecked = (0, _vue.computed)(function () {
      return leftSearchItem.value.filter(function (item) {
        return item.checked && !item.disabled;
      });
    });
    var rightChecked = (0, _vue.computed)(function () {
      return rightSearchItem.value.filter(function (item) {
        return item.checked && !item.disabled;
      });
    });
    var isLeftAllCheck = (0, _vue.computed)(function () {
      return leftChecked.value.length === leftSearchItem.value.filter(function (item) {
        return !item.disabled;
      }).length && leftSearchItem.value.length !== 0;
    });
    var isRightAllCheck = (0, _vue.computed)(function () {
      return rightChecked.value.length === rightSearchItem.value.filter(function (item) {
        return !item.disabled;
      }).length && rightSearchItem.value.length !== 0;
    });

    var handleChecked = function handleChecked(item) {
      if (item.disabled) return;
      item.checked = !item.checked;
    };

    var handleTransfer = function handleTransfer(type) {
      if (type == 'left') {
        var items = (0, _utils.deepCopy)(leftChecked.value);
        onChange && onChange(items, 'leftToRight');
        leftItem.value = leftItem.value.filter(function (item) {
          return !leftChecked.value.includes(item);
        });
        items.forEach(function (item) {
          item.checked = false;
        });
        rightItem.value = [].concat(_toConsumableArray(rightItem.value), _toConsumableArray(items));
        emit('update:modelValue', rightItem.value.map(function (item) {
          return item.value;
        }));
      } else {
        var _items = (0, _utils.deepCopy)(rightChecked.value);

        onChange && onChange(_items, 'rightToLeft');
        rightItem.value = rightItem.value.filter(function (item) {
          return !rightChecked.value.includes(item);
        });
        emit('update:modelValue', rightItem.value.map(function (item) {
          return item.value;
        }));

        _items.forEach(function (item) {
          item.checked = false;
        });

        leftItem.value = [].concat(_toConsumableArray(leftItem.value), _toConsumableArray(_items));
      }
    };

    var handelAllCheck = function handelAllCheck(type) {
      if (type === 'left') {
        if (isLeftAllCheck.value) {
          leftSearchItem.value.forEach(function (item) {
            if (item.disabled) return;
            item.checked = false;
          });
        } else {
          leftSearchItem.value.forEach(function (item) {
            if (item.disabled) return;
            item.checked = true;
          });
        }
      } else {
        if (isRightAllCheck.value) {
          rightSearchItem.value.forEach(function (item) {
            if (item.disabled) return;
            item.checked = false;
          });
        } else {
          rightSearchItem.value.forEach(function (item) {
            if (item.disabled) return;
            item.checked = true;
          });
        }
      }
    };

    return function () {
      var width = props.width,
          height = props.height,
          title = props.title,
          text = props.text,
          showSearch = props.showSearch;
      return (0, _vue.createVNode)("div", {
        "class": "layui-transfer layui-form layui-border-box"
      }, [(0, _vue.createVNode)("div", {
        "class": "layui-transfer-box",
        "style": {
          height: height + 'px',
          width: width + 'px'
        }
      }, [(0, _vue.createVNode)("div", {
        "class": "layui-transfer-header"
      }, [(0, _vue.createVNode)("div", {
        "class": (0, _utils.className)(['layui-unselect', ' layui-form-checkbox', {
          'layui-form-checked': isLeftAllCheck.value
        }]),
        "onClick": function onClick() {
          return handelAllCheck('left');
        }
      }, [(0, _vue.createVNode)("span", null, [title[0]]), (0, _vue.createVNode)("i", {
        "class": "layui-icon"
      }, [(0, _vue.createTextVNode)("\uE605")])])]), showSearch && (0, _vue.createVNode)("div", {
        "class": "layui-transfer-search"
      }, [(0, _vue.createVNode)("i", {
        "class": "layui-icon "
      }, [(0, _vue.createTextVNode)("\uE615")]), (0, _vue.withDirectives)((0, _vue.createVNode)("input", {
        "type": "text",
        "class": "layui-input",
        "placeholder": "关键词搜索",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return leftSearchKey.value = $event;
        }
      }, null), [[_vue.vModelText, leftSearchKey.value]])]), (0, _vue.createVNode)("ul", {
        "class": "layui-transfer-data",
        "style": {
          height: height - 48 - (showSearch ? 56 : 0) + 'px'
        }
      }, [leftSearchItem.value.length ? leftSearchItem.value.map(function (item) {
        return (0, _vue.createVNode)("li", null, [(0, _vue.createVNode)("div", {
          "class": (0, _utils.className)(['layui-unselect', ' layui-form-checkbox', {
            'layui-form-checked': item.checked,
            'layui-disable': item.disabled
          }]),
          "onClick": function onClick() {
            return handleChecked(item);
          }
        }, [(0, _vue.createVNode)("span", null, [item.title]), (0, _vue.createVNode)("i", {
          "class": "layui-icon"
        }, [(0, _vue.createTextVNode)("\uE605")])])]);
      }) : (0, _vue.createVNode)("p", {
        "class": "layui-none"
      }, [leftItem.value.length ? text.searchNone : text.none])])]), (0, _vue.createVNode)("div", {
        "class": "layui-transfer-active"
      }, [(0, _vue.createVNode)("button", {
        "type": "button",
        "class": (0, _utils.className)(['layui-transfer-btn', {
          'layui-btn-disabled': !leftChecked.value.length
        }]),
        "onClick": function onClick() {
          return handleTransfer('left');
        }
      }, [(0, _vue.createVNode)("i", {
        "class": "layui-icon"
      }, [(0, _vue.createTextVNode)("\uE65B")])]), (0, _vue.createVNode)("button", {
        "type": "button",
        "class": (0, _utils.className)(['layui-transfer-btn', {
          'layui-btn-disabled': !rightChecked.value.length
        }]),
        "onClick": function onClick() {
          return handleTransfer('right');
        }
      }, [(0, _vue.createVNode)("i", {
        "class": "layui-icon"
      }, [(0, _vue.createTextVNode)("\uE65A")])])]), (0, _vue.createVNode)("div", {
        "class": "layui-transfer-box",
        "style": {
          height: height + 'px',
          width: width + 'px'
        }
      }, [(0, _vue.createVNode)("div", {
        "class": "layui-transfer-header"
      }, [(0, _vue.createVNode)("div", {
        "class": (0, _utils.className)(['layui-unselect', ' layui-form-checkbox', {
          'layui-form-checked': isRightAllCheck.value
        }]),
        "onClick": function onClick() {
          return handelAllCheck('right');
        }
      }, [(0, _vue.createVNode)("span", null, [title[1]]), (0, _vue.createVNode)("i", {
        "class": "layui-icon"
      }, [(0, _vue.createTextVNode)("\uE605")])])]), showSearch && (0, _vue.createVNode)("div", {
        "class": "layui-transfer-search"
      }, [(0, _vue.createVNode)("i", {
        "class": "layui-icon "
      }, [(0, _vue.createTextVNode)("\uE615")]), (0, _vue.withDirectives)((0, _vue.createVNode)("input", {
        "type": "text",
        "class": "layui-input",
        "placeholder": "关键词搜索",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return rightSearchKey.value = $event;
        }
      }, null), [[_vue.vModelText, rightSearchKey.value]])]), (0, _vue.createVNode)("ul", {
        "class": "layui-transfer-data",
        "style": {
          height: height - 48 - (showSearch ? 56 : 0) + 'px'
        }
      }, [rightSearchItem.value.length ? rightSearchItem.value.map(function (item) {
        return (0, _vue.createVNode)("li", null, [(0, _vue.createVNode)("div", {
          "class": (0, _utils.className)(['layui-unselect', ' layui-form-checkbox', {
            'layui-form-checked': item.checked,
            'layui-disable': item.disabled
          }]),
          "onClick": function onClick() {
            return handleChecked(item);
          }
        }, [(0, _vue.createVNode)("span", null, [item.title]), (0, _vue.createVNode)("i", {
          "class": "layui-icon"
        }, [(0, _vue.createTextVNode)("\uE605")])])]);
      }) : (0, _vue.createVNode)("p", {
        "class": "layui-none"
      }, [rightItem.value.length ? text.searchNone : text.none])])])]);
    };
  }
}));

exports["default"] = _default;