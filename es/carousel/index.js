import { createTextVNode as _createTextVNode, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
import propsType, { TRIGGER } from './propsType';
import { getChildren } from '../_utils/component';
var ELEM_LEFT = 'layui-carousel-left',
    ELEM_RIGHT = 'layui-carousel-right',
    ELEM_PREV = 'layui-carousel-prev',
    ELEM_NEXT = 'layui-carousel-next',
    THIS = 'layui-this';
var ELEM_IND = 'layui-carousel-ind',
    ELEM_ARROW = 'layui-carousel-arrow';
export default withInstall(defineComponent({
  name: 'LayCarousel',
  props: propsType,
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
    var childrenLen = getChildren(this.$slots["default"](), 'LayCarouselItem').length;
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
      return _defineProperty({}, trigger === TRIGGER.HOVER ? 'onMouseover' : 'onClick', function () {
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

    return _createVNode("div", {
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
    }, [_createVNode("div", {
      "carousel-item": "",
      "ref": function ref(dom) {
        carouselDom = dom;
        if (carouselDom) carouselDom.querySelectorAll('.layui-carousel-item')[index].classList.add(THIS);
      }
    }, [this.$slots["default"]()]), _createVNode("div", {
      "class": ELEM_IND,
      "ref": function ref(dom) {
        indicatorDom = dom;
      }
    }, [_createVNode("ul", null, [function () {
      var indics = [];

      for (var i = 0; i < childrenLen; i++) {
        indics.push(_createVNode("li", _mergeProps({
          "class": index === i ? THIS : ''
        }, handleEvent(i)), null));
      }

      return indics;
    }()])]), _createVNode("button", {
      "class": "layui-icon  ".concat(ELEM_ARROW),
      "lay-type": "sub",
      "onClick": function onClick() {
        onBeforeChange && onBeforeChange(index, index - 1);
        slide('sub', 1);
      }
    }, [_createTextVNode(" "), anim === 'updown' ? _createVNode("span", null, [_createTextVNode("\uE619")]) : _createVNode("span", null, [_createTextVNode("\uE603")])]), _createVNode("button", {
      "class": "layui-icon ".concat(ELEM_ARROW),
      "lay-type": "add",
      "onClick": function onClick() {
        onBeforeChange && onBeforeChange(index, index + 1);
        slide('add', 1);
      }
    }, [_createTextVNode(" "), anim === 'updown' ? _createVNode("span", null, [_createTextVNode("\uE61A")]) : _createVNode("span", null, [_createTextVNode("\uE602")]), _createTextVNode(" ")])]);
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