import { withDirectives as _withDirectives, vModelText as _vModelText, createTextVNode as _createTextVNode, createVNode as _createVNode } from "vue";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { computed, defineComponent, ref } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
import propsType from './propsType';
import { className, deepCopy } from '../_utils/utils';
export default withInstall(defineComponent({
  name: 'LayTransfer',
  props: propsType,
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var data = props.data,
        modelValue = props.modelValue,
        onChange = props.onChange;
    data = deepCopy(data);
    var leftSearchKey = ref("");
    var rightSearchKey = ref("");
    var leftItem = ref(data.filter(function (item) {
      return !modelValue.includes(item.value);
    }));
    var rightItem = ref(data.filter(function (item) {
      return modelValue.includes(item.value);
    }));
    var leftSearchItem = computed(function () {
      return leftItem.value.filter(function (item) {
        return item.title.includes(leftSearchKey.value);
      });
    });
    var rightSearchItem = computed(function () {
      return rightItem.value.filter(function (item) {
        return item.title.includes(rightSearchKey.value);
      });
    });
    var leftChecked = computed(function () {
      return leftSearchItem.value.filter(function (item) {
        return item.checked && !item.disabled;
      });
    });
    var rightChecked = computed(function () {
      return rightSearchItem.value.filter(function (item) {
        return item.checked && !item.disabled;
      });
    });
    var isLeftAllCheck = computed(function () {
      return leftChecked.value.length === leftSearchItem.value.filter(function (item) {
        return !item.disabled;
      }).length && leftSearchItem.value.length !== 0;
    });
    var isRightAllCheck = computed(function () {
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
        var items = deepCopy(leftChecked.value);
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
        var _items = deepCopy(rightChecked.value);

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
      return _createVNode("div", {
        "class": "layui-transfer layui-form layui-border-box"
      }, [_createVNode("div", {
        "class": "layui-transfer-box",
        "style": {
          height: height + 'px',
          width: width + 'px'
        }
      }, [_createVNode("div", {
        "class": "layui-transfer-header"
      }, [_createVNode("div", {
        "class": className(['layui-unselect', ' layui-form-checkbox', {
          'layui-form-checked': isLeftAllCheck.value
        }]),
        "onClick": function onClick() {
          return handelAllCheck('left');
        }
      }, [_createVNode("span", null, [title[0]]), _createVNode("i", {
        "class": "layui-icon"
      }, [_createTextVNode("\uE605")])])]), showSearch && _createVNode("div", {
        "class": "layui-transfer-search"
      }, [_createVNode("i", {
        "class": "layui-icon "
      }, [_createTextVNode("\uE615")]), _withDirectives(_createVNode("input", {
        "type": "text",
        "class": "layui-input",
        "placeholder": "关键词搜索",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return leftSearchKey.value = $event;
        }
      }, null), [[_vModelText, leftSearchKey.value]])]), _createVNode("ul", {
        "class": "layui-transfer-data",
        "style": {
          height: height - 48 - (showSearch ? 56 : 0) + 'px'
        }
      }, [leftSearchItem.value.length ? leftSearchItem.value.map(function (item) {
        return _createVNode("li", null, [_createVNode("div", {
          "class": className(['layui-unselect', ' layui-form-checkbox', {
            'layui-form-checked': item.checked,
            'layui-disable': item.disabled
          }]),
          "onClick": function onClick() {
            return handleChecked(item);
          }
        }, [_createVNode("span", null, [item.title]), _createVNode("i", {
          "class": "layui-icon"
        }, [_createTextVNode("\uE605")])])]);
      }) : _createVNode("p", {
        "class": "layui-none"
      }, [leftItem.value.length ? text.searchNone : text.none])])]), _createVNode("div", {
        "class": "layui-transfer-active"
      }, [_createVNode("button", {
        "type": "button",
        "class": className(['layui-transfer-btn', {
          'layui-btn-disabled': !leftChecked.value.length
        }]),
        "onClick": function onClick() {
          return handleTransfer('left');
        }
      }, [_createVNode("i", {
        "class": "layui-icon"
      }, [_createTextVNode("\uE65B")])]), _createVNode("button", {
        "type": "button",
        "class": className(['layui-transfer-btn', {
          'layui-btn-disabled': !rightChecked.value.length
        }]),
        "onClick": function onClick() {
          return handleTransfer('right');
        }
      }, [_createVNode("i", {
        "class": "layui-icon"
      }, [_createTextVNode("\uE65A")])])]), _createVNode("div", {
        "class": "layui-transfer-box",
        "style": {
          height: height + 'px',
          width: width + 'px'
        }
      }, [_createVNode("div", {
        "class": "layui-transfer-header"
      }, [_createVNode("div", {
        "class": className(['layui-unselect', ' layui-form-checkbox', {
          'layui-form-checked': isRightAllCheck.value
        }]),
        "onClick": function onClick() {
          return handelAllCheck('right');
        }
      }, [_createVNode("span", null, [title[1]]), _createVNode("i", {
        "class": "layui-icon"
      }, [_createTextVNode("\uE605")])])]), showSearch && _createVNode("div", {
        "class": "layui-transfer-search"
      }, [_createVNode("i", {
        "class": "layui-icon "
      }, [_createTextVNode("\uE615")]), _withDirectives(_createVNode("input", {
        "type": "text",
        "class": "layui-input",
        "placeholder": "关键词搜索",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return rightSearchKey.value = $event;
        }
      }, null), [[_vModelText, rightSearchKey.value]])]), _createVNode("ul", {
        "class": "layui-transfer-data",
        "style": {
          height: height - 48 - (showSearch ? 56 : 0) + 'px'
        }
      }, [rightSearchItem.value.length ? rightSearchItem.value.map(function (item) {
        return _createVNode("li", null, [_createVNode("div", {
          "class": className(['layui-unselect', ' layui-form-checkbox', {
            'layui-form-checked': item.checked,
            'layui-disable': item.disabled
          }]),
          "onClick": function onClick() {
            return handleChecked(item);
          }
        }, [_createVNode("span", null, [item.title]), _createVNode("i", {
          "class": "layui-icon"
        }, [_createTextVNode("\uE605")])])]);
      }) : _createVNode("p", {
        "class": "layui-none"
      }, [rightItem.value.length ? text.searchNone : text.none])])])]);
    };
  }
}));