"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _utils = require("../_utils/utils");

var _component = require("../_utils/component");

require("./style/index");

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
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
    var closeTab = (0, _vue.ref)([]);
    return function () {
      var children = slots["default"] && slots["default"]();
      var c = (0, _component.getChildren)(children, 'LayTabPane');

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

      return (0, _vue.createVNode)("div", {
        "style": style,
        "class": (0, _utils.className)(['layui-tab', {
          'layui-tab-brief': props.type === 'brief',
          'layui-tab-card': props.type === 'card'
        }])
      }, [(0, _vue.createVNode)("ul", {
        "class": 'layui-tab-title'
      }, [displayTab.map(function (_ref4) {
        var p = _ref4.props;
        return (0, _vue.createVNode)("li", {
          "class": (0, _utils.className)({
            'layui-this': p.name === props.modelValue
          }),
          "onClick": function onClick() {
            return handleTabClick(p);
          }
        }, [p.label, props.closable && (0, _vue.createVNode)("i", {
          "class": 'layui-icon  layui-tab-close',
          "onClick": function onClick(e) {
            return handleTabClose(e, p);
          }
        }, [(0, _vue.createTextVNode)("\u1006")])]);
      })]), displayTab.find(function (_ref5) {
        var p = _ref5.props;
        return p.name === props.modelValue;
      })]);
    };
  }
}));

exports["default"] = _default;