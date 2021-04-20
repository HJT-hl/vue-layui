"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _dom = _interopRequireDefault(require("../_utils/dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0, _vue.isVNode)(s);
}

var _default2 = (0, _component.withInstall)((0, _vue.defineComponent)({
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
    var lock = (0, _vue.ref)(false);
    var isOver = (0, _vue.ref)(false);

    var next = function next(conditions) {
      isOver.value = conditions;
      lock.value = false;
    };

    var done = function done() {
      lock.value = true;
      props.onDone(++page, next);
    };

    (0, _vue.onUnmounted)(function () {
      if (timer) clearTimeout(timer);
    });
    (0, _vue.onMounted)(function () {
      done();
    });
    (0, _vue.onBeforeUpdate)(function () {
      var scrollDom = scrollElemId && (0, _dom["default"])('#' + scrollElemId);

      if (height) {
        scrollDom = (0, _dom["default"])(selfDom);
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
    var endRender = slots.end ? slots.end() : (0, _vue.createVNode)("span", null, [(0, _vue.createTextVNode)("\u6CA1\u6709\u66F4\u591A\u4E86")]);
    var loadingRender = slots.loading ? slots.loading() : (0, _vue.createVNode)("b", null, [(0, _vue.createVNode)("i", {
      "class": "layui-flow-loadin-icon layui-icon"
    }, [(0, _vue.createTextVNode)("\uE63E")])]);
    var notAutoRender = slots.notAuto ? slots.notAuto() : (0, _vue.createVNode)("span", {
      "class": "layui-loading-more"
    }, [(0, _vue.createTextVNode)("\u52A0\u8F7D\u66F4\u591A")]);
    return function () {
      return (0, _vue.createVNode)("div", {
        "class": height && "layui-flow",
        "ref": function ref(dom) {
          selfDom = dom;
        },
        "style": {
          height: typeof height === "number" ? height + 'px' : height
        }
      }, [slots["default"] && slots["default"](), (0, _vue.createVNode)("div", {
        "class": "layui-flow-more"
      }, [lock.value ? loadingRender : isOver.value ? (0, _vue.createVNode)("span", {
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

exports["default"] = _default2;