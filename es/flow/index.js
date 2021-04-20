import { isVNode as _isVNode, createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";
import { defineComponent, onBeforeUpdate, onMounted, onUnmounted, ref } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
import $ from '../_utils/dom';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default withInstall(defineComponent({
  name: 'LayFlow',
  props: {
    isAuto: {
      type: Boolean,
      "default": true
    },
    mb: {
      type: Number,
      "default": 50
    },
    onDone: {
      type: Function,
      required: true
    },
    scrollElemId: {
      type: String,
      "default": ''
    },
    height: [Number, String]
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var scrollElemId = props.scrollElemId,
        mb = props.mb,
        isAuto = props.isAuto,
        height = props.height;
    var timer, selfDom;
    var page = 0;
    var lock = ref(false);
    var isOver = ref(false);

    var next = function next(conditions) {
      isOver.value = conditions;
      lock.value = false;
    };

    var done = function done() {
      lock.value = true;
      props.onDone(++page, next);
    };

    onUnmounted(function () {
      if (timer) clearTimeout(timer);
    });
    onMounted(function () {
      done();
    });
    onBeforeUpdate(function () {
      var scrollDom = scrollElemId && $('#' + scrollElemId);

      if (height) {
        scrollDom = $(selfDom);
      }

      var handleScroll = function handleScroll() {
        if (!isOver.value || !isAuto) return; //如果已经结束，或者元素处于隐藏状态，则不执行滚动加载

        var top = 0,
            height = 0,
            scrollHeight = 0;

        if (scrollDom) {
          top = scrollDom.scrollTop();
          height = scrollDom.height();
          scrollHeight = scrollDom.scrollHeight();
        } else {
          top = document.documentElement.scrollTop;
          height = window.innerHeight;
          scrollHeight = document.documentElement.scrollHeight;
        }

        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          if (scrollHeight - top - height <= mb) {
            lock.value || done();
          }
        }, 100);
      };

      if (scrollDom) {
        scrollDom.on('scroll', handleScroll);
      } else {
        document.addEventListener('scroll', handleScroll);
      }

      handleScroll();
    });
    var endRender = slots.end ? slots.end() : _createVNode("span", null, [_createTextVNode("\u6CA1\u6709\u66F4\u591A\u4E86")]);
    var loadingRender = slots.loading ? slots.loading() : _createVNode("b", null, [_createVNode("i", {
      "class": "layui-flow-loadin-icon layui-icon"
    }, [_createTextVNode("\uE63E")])]);
    var notAutoRender = slots.notAuto ? slots.notAuto() : _createVNode("span", {
      "class": "layui-loading-more"
    }, [_createTextVNode("\u52A0\u8F7D\u66F4\u591A")]);
    return function () {
      return _createVNode("div", {
        "class": height && "layui-flow",
        "ref": function ref(dom) {
          selfDom = dom;
        },
        "style": {
          height: typeof height === "number" ? height + 'px' : height
        }
      }, [slots["default"] && slots["default"](), _createVNode("div", {
        "class": "layui-flow-more"
      }, [lock.value ? loadingRender : isOver.value ? _createVNode("span", {
        "onClick": function onClick() {
          return done();
        },
        "style": {
          cursor: "pointer"
        }
      }, _isSlot(notAutoRender) ? notAutoRender : {
        "default": function _default() {
          return [notAutoRender];
        }
      }) : endRender])]);
    };
  }
}));