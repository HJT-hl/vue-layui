import { createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";
import { defineComponent, ref } from 'vue';
import { className } from '../_utils/utils';
import { getChildren } from '../_utils/component';
import { withInstall } from '../_utils/component';
import './style/index';
export default withInstall(defineComponent({
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
    var closeTab = ref([]);
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

      return _createVNode("div", {
        "style": style,
        "class": className(['layui-tab', {
          'layui-tab-brief': props.type === 'brief',
          'layui-tab-card': props.type === 'card'
        }])
      }, [_createVNode("ul", {
        "class": 'layui-tab-title'
      }, [displayTab.map(function (_ref4) {
        var p = _ref4.props;
        return _createVNode("li", {
          "class": className({
            'layui-this': p.name === props.modelValue
          }),
          "onClick": function onClick() {
            return handleTabClick(p);
          }
        }, [p.label, props.closable && _createVNode("i", {
          "class": 'layui-icon  layui-tab-close',
          "onClick": function onClick(e) {
            return handleTabClose(e, p);
          }
        }, [_createTextVNode("\u1006")])]);
      })]), displayTab.find(function (_ref5) {
        var p = _ref5.props;
        return p.name === props.modelValue;
      })]);
    };
  }
}));