/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

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

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var propsType = {
  data: {
    type: Array,
    "default": []
  },
  modelValue: {
    type: Array,
    "default": []
  },
  title: {
    type: Array,
    "default": ['列表一', '列表二']
  },
  width: {
    type: Number,
    "default": 200
  },
  height: {
    type: Number,
    "default": 360
  },
  showSearch: {
    type: Boolean,
    "default": false
  },
  text: {
    type: Object,
    "default": {
      none: '无数据',
      searchNone: '无匹配数据'
    }
  },
  onChange: {
    type: Function
  }
};

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
function deepCopy(obj) {
  var deepClone1 = function deepClone1(obj) {
    var res = obj;

    if (Array.isArray(obj)) {
      res = [];

      var _iterator = _createForOfIteratorHelper(obj),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;
          res.push(deepClone1(value));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else if (_typeof(obj) === 'object') {
      res = {};

      for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        res[key] = deepClone1(obj[key]);
      }
    }

    return res;
  };

  var deepClone2 = function deepClone2(obj) {
    return JSON.parse(JSON.stringify(obj));
  };

  return Object.keys(obj).length > 1000 ? deepClone1(obj) : deepClone2(obj);
}

var Transfer = vue.defineComponent({
  name: 'LayTransfer',
  props: propsType,
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var data = props.data,
        modelValue = props.modelValue,
        onChange = props.onChange;
    data = deepCopy(data);
    var leftSearchKey = vue.ref("");
    var rightSearchKey = vue.ref("");
    var leftItem = vue.ref(data.filter(function (item) {
      return !modelValue.includes(item.value);
    }));
    var rightItem = vue.ref(data.filter(function (item) {
      return modelValue.includes(item.value);
    }));
    var leftSearchItem = vue.computed(function () {
      return leftItem.value.filter(function (item) {
        return item.title.includes(leftSearchKey.value);
      });
    });
    var rightSearchItem = vue.computed(function () {
      return rightItem.value.filter(function (item) {
        return item.title.includes(rightSearchKey.value);
      });
    });
    var leftChecked = vue.computed(function () {
      return leftSearchItem.value.filter(function (item) {
        return item.checked && !item.disabled;
      });
    });
    var rightChecked = vue.computed(function () {
      return rightSearchItem.value.filter(function (item) {
        return item.checked && !item.disabled;
      });
    });
    var isLeftAllCheck = vue.computed(function () {
      return leftChecked.value.length === leftSearchItem.value.filter(function (item) {
        return !item.disabled;
      }).length && leftSearchItem.value.length !== 0;
    });
    var isRightAllCheck = vue.computed(function () {
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
      return vue.createVNode("div", {
        "class": "layui-transfer layui-form layui-border-box"
      }, [vue.createVNode("div", {
        "class": "layui-transfer-box",
        "style": {
          height: height + 'px',
          width: width + 'px'
        }
      }, [vue.createVNode("div", {
        "class": "layui-transfer-header"
      }, [vue.createVNode("div", {
        "class": className(['layui-unselect', ' layui-form-checkbox', {
          'layui-form-checked': isLeftAllCheck.value
        }]),
        "onClick": function onClick() {
          return handelAllCheck('left');
        }
      }, [vue.createVNode("span", null, [title[0]]), vue.createVNode("i", {
        "class": "layui-icon"
      }, [vue.createTextVNode("\uE605")])])]), showSearch && vue.createVNode("div", {
        "class": "layui-transfer-search"
      }, [vue.createVNode("i", {
        "class": "layui-icon "
      }, [vue.createTextVNode("\uE615")]), vue.withDirectives(vue.createVNode("input", {
        "type": "text",
        "class": "layui-input",
        "placeholder": "关键词搜索",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return leftSearchKey.value = $event;
        }
      }, null), [[vue.vModelText, leftSearchKey.value]])]), vue.createVNode("ul", {
        "class": "layui-transfer-data",
        "style": {
          height: height - 48 - (showSearch ? 56 : 0) + 'px'
        }
      }, [leftSearchItem.value.length ? leftSearchItem.value.map(function (item) {
        return vue.createVNode("li", null, [vue.createVNode("div", {
          "class": className(['layui-unselect', ' layui-form-checkbox', {
            'layui-form-checked': item.checked,
            'layui-disable': item.disabled
          }]),
          "onClick": function onClick() {
            return handleChecked(item);
          }
        }, [vue.createVNode("span", null, [item.title]), vue.createVNode("i", {
          "class": "layui-icon"
        }, [vue.createTextVNode("\uE605")])])]);
      }) : vue.createVNode("p", {
        "class": "layui-none"
      }, [leftItem.value.length ? text.searchNone : text.none])])]), vue.createVNode("div", {
        "class": "layui-transfer-active"
      }, [vue.createVNode("button", {
        "type": "button",
        "class": className(['layui-transfer-btn', {
          'layui-btn-disabled': !leftChecked.value.length
        }]),
        "onClick": function onClick() {
          return handleTransfer('left');
        }
      }, [vue.createVNode("i", {
        "class": "layui-icon"
      }, [vue.createTextVNode("\uE65B")])]), vue.createVNode("button", {
        "type": "button",
        "class": className(['layui-transfer-btn', {
          'layui-btn-disabled': !rightChecked.value.length
        }]),
        "onClick": function onClick() {
          return handleTransfer('right');
        }
      }, [vue.createVNode("i", {
        "class": "layui-icon"
      }, [vue.createTextVNode("\uE65A")])])]), vue.createVNode("div", {
        "class": "layui-transfer-box",
        "style": {
          height: height + 'px',
          width: width + 'px'
        }
      }, [vue.createVNode("div", {
        "class": "layui-transfer-header"
      }, [vue.createVNode("div", {
        "class": className(['layui-unselect', ' layui-form-checkbox', {
          'layui-form-checked': isRightAllCheck.value
        }]),
        "onClick": function onClick() {
          return handelAllCheck('right');
        }
      }, [vue.createVNode("span", null, [title[1]]), vue.createVNode("i", {
        "class": "layui-icon"
      }, [vue.createTextVNode("\uE605")])])]), showSearch && vue.createVNode("div", {
        "class": "layui-transfer-search"
      }, [vue.createVNode("i", {
        "class": "layui-icon "
      }, [vue.createTextVNode("\uE615")]), vue.withDirectives(vue.createVNode("input", {
        "type": "text",
        "class": "layui-input",
        "placeholder": "关键词搜索",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return rightSearchKey.value = $event;
        }
      }, null), [[vue.vModelText, rightSearchKey.value]])]), vue.createVNode("ul", {
        "class": "layui-transfer-data",
        "style": {
          height: height - 48 - (showSearch ? 56 : 0) + 'px'
        }
      }, [rightSearchItem.value.length ? rightSearchItem.value.map(function (item) {
        return vue.createVNode("li", null, [vue.createVNode("div", {
          "class": className(['layui-unselect', ' layui-form-checkbox', {
            'layui-form-checked': item.checked,
            'layui-disable': item.disabled
          }]),
          "onClick": function onClick() {
            return handleChecked(item);
          }
        }, [vue.createVNode("span", null, [item.title]), vue.createVNode("i", {
          "class": "layui-icon"
        }, [vue.createTextVNode("\uE605")])])]);
      }) : vue.createVNode("p", {
        "class": "layui-none"
      }, [rightItem.value.length ? text.searchNone : text.none])])])]);
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

var index = withInstall(Transfer);

module.exports = index;
