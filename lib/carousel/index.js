"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _propsType = _interopRequireWildcard(require("./propsType"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ELEM_LEFT = 'layui-carousel-left',
    ELEM_RIGHT = 'layui-carousel-right',
    ELEM_PREV = 'layui-carousel-prev',
    ELEM_NEXT = 'layui-carousel-next',
    THIS = 'layui-this';
var ELEM_IND = 'layui-carousel-ind',
    ELEM_ARROW = 'layui-carousel-arrow';

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayCarousel',
  props: _propsType["default"],
  render: function render() {
    var _this = this;

    var _this$$props = this.$props,
        index = _this$$props.index,
        interval = _this$$props.interval,
        full = _this$$props.full,
        width = _this$$props.width,
        height = _this$$props.height,
        anim = _this$$props.anim,
        indicator = _this$$props.indicator,
        trigger = _this$$props.trigger,
        arrow = _this$$props.arrow,
        autoplay = _this$$props.autoplay,
        onAfterChange = _this$$props.onAfterChange,
        onBeforeChange = _this$$props.onBeforeChange;
    if (this.$slots["default"] === undefined) return null;
    var carouselDom, indicatorDom;
    var childrenLen = (0, _component.getChildren)(this.$slots["default"](), 'LayCarouselItem').length;
    if (childrenLen <= 1) return;
    if (index < 0) index = 0;
    if (index >= childrenLen) index = childrenLen - 1;
    if (interval < 800) interval = 800;
    var carouselFullStyle = {}; //是否全屏模式

    if (full) {
      carouselFullStyle = {
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: 9999
      };
    } else {
      if (typeof width === 'number') width = width + 'px';
      if (typeof height === 'number') height = height + 'px';
      carouselFullStyle = {
        width: width,
        height: height
      };
    } //指示器等动作


    var handleEvent = function handleEvent(i) {
      return _defineProperty({}, trigger === _propsType.TRIGGER.HOVER ? 'onMouseover' : 'onClick', function () {
        if (i > index) {
          onBeforeChange && onBeforeChange(index, i);
          slide('add', i - index);
        } else if (i < index) {
          onBeforeChange && onBeforeChange(i, index);
          slide('sub', index - i);
        }
      });
    };

    var haveSlide = false; //索引递增

    var addIndex = function addIndex(num) {
      num = num || 1;
      index = index + num; //index不能超过轮播总数量

      if (index >= childrenLen) {
        index = 0;
      }
    }; //索引递减


    var subIndex = function subIndex(num) {
      num = num || 1;
      index = index - num; //index不能超过轮播总数量

      if (index < 0) {
        index = childrenLen - 1;
      }
    }; //滑动切换


    var slide = function slide(type, num) {
      if (!carouselDom || haveSlide) return;
      var carouselItem = carouselDom.querySelectorAll('.layui-carousel-item');
      var thisIndex = index; //滑动方向

      if (type === 'sub') {
        subIndex(num);
        carouselItem[index].classList.add(ELEM_PREV);
        setTimeout(function () {
          carouselItem[index].classList.add(ELEM_RIGHT);
          carouselItem[thisIndex].classList.add(ELEM_RIGHT);
        }, 50);
      } else {
        addIndex(num);
        carouselItem[index].classList.add(ELEM_NEXT);
        setTimeout(function () {
          carouselItem[index].classList.add(ELEM_LEFT);
          carouselItem[thisIndex].classList.add(ELEM_LEFT);
        }, 50);
      } //移除过度类


      setTimeout(function () {
        carouselItem.forEach(function (item) {
          item.classList.remove(THIS);
          item.classList.remove(ELEM_PREV);
          item.classList.remove(ELEM_NEXT);
          item.classList.remove(ELEM_LEFT);
          item.classList.remove(ELEM_RIGHT);
        });
        carouselItem[index].classList.add(THIS);
        haveSlide = false; //解锁

        onAfterChange && onAfterChange(index);
      }, 300);
      indicatorDom && indicatorDom.querySelectorAll(".".concat(ELEM_IND, " li")).forEach(function (item, i) {
        if (i === index) item.classList.add(THIS);else item.classList.remove(THIS);
      });
      haveSlide = true;
    }; //自动轮播


    var autoplayFun = function autoplayFun() {
      if (!autoplay) return;
      clearInterval(_this.timer); // @ts-ignore

      _this.timer = setInterval(function () {
        onBeforeChange && onBeforeChange(index, index + 1);
        slide('add', 1);
      }, interval);
    };

    autoplayFun();

    this["goto"] = function (i) {
      if (i > index) {
        onBeforeChange && onBeforeChange(index, i);
        slide('add', i - index);
      } else if (i < index) {
        onBeforeChange && onBeforeChange(i, index);
        slide('sub', index - i);
      }
    };

    this.next = function () {
      onBeforeChange && onBeforeChange(index, index + 1);
      slide('add', 1);
    };

    this.prev = function () {
      onBeforeChange && onBeforeChange(index, index - 1);
      slide('sub', 1);
    };

    return (0, _vue.createVNode)("div", {
      "class": 'layui-carousel',
      "style": carouselFullStyle,
      "lay-anim": anim,
      "lay-indicator": indicator,
      "lay-arrow": arrow,
      "onMouseenter": function onMouseenter() {
        return clearInterval(_this.timer);
      },
      "onMouseleave": function onMouseleave() {
        return autoplayFun();
      }
    }, [(0, _vue.createVNode)("div", {
      "carousel-item": "",
      "ref": function ref(dom) {
        carouselDom = dom;
        if (carouselDom) carouselDom.querySelectorAll('.layui-carousel-item')[index].classList.add(THIS);
      }
    }, [this.$slots["default"]()]), (0, _vue.createVNode)("div", {
      "class": ELEM_IND,
      "ref": function ref(dom) {
        indicatorDom = dom;
      }
    }, [(0, _vue.createVNode)("ul", null, [function () {
      var indics = [];

      for (var i = 0; i < childrenLen; i++) {
        indics.push((0, _vue.createVNode)("li", (0, _vue.mergeProps)({
          "class": index === i ? THIS : ''
        }, handleEvent(i)), null));
      }

      return indics;
    }()])]), (0, _vue.createVNode)("button", {
      "class": "layui-icon  ".concat(ELEM_ARROW),
      "lay-type": "sub",
      "onClick": function onClick() {
        onBeforeChange && onBeforeChange(index, index - 1);
        slide('sub', 1);
      }
    }, [(0, _vue.createTextVNode)(" "), anim === 'updown' ? (0, _vue.createVNode)("span", null, [(0, _vue.createTextVNode)("\uE619")]) : (0, _vue.createVNode)("span", null, [(0, _vue.createTextVNode)("\uE603")])]), (0, _vue.createVNode)("button", {
      "class": "layui-icon ".concat(ELEM_ARROW),
      "lay-type": "add",
      "onClick": function onClick() {
        onBeforeChange && onBeforeChange(index, index + 1);
        slide('add', 1);
      }
    }, [(0, _vue.createTextVNode)(" "), anim === 'updown' ? (0, _vue.createVNode)("span", null, [(0, _vue.createTextVNode)("\uE61A")]) : (0, _vue.createVNode)("span", null, [(0, _vue.createTextVNode)("\uE602")]), (0, _vue.createTextVNode)(" ")])]);
  },
  onUnmounted: function onUnmounted() {
    clearInterval(this.timer);
  },
  setup: function setup() {
    var _goto = function _goto(index) {};

    var next = function next() {};

    var prev = function prev() {};

    var timer = undefined;
    return {
      "goto": _goto,
      next: next,
      prev: prev,
      timer: timer
    };
  }
}));

exports["default"] = _default;