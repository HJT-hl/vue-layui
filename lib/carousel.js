/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
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

var ARROWMNUM;

(function (ARROWMNUM) {
  ARROWMNUM["HOVER"] = "hover";
  ARROWMNUM["ALWAYS"] = "always";
  ARROWMNUM["NONE"] = "none";
})(ARROWMNUM || (ARROWMNUM = {}));

var INDICATOR;

(function (INDICATOR) {
  INDICATOR["INSIDE"] = "inside";
  INDICATOR["OUTSIDE"] = "outside";
  INDICATOR["NONE"] = "none";
})(INDICATOR || (INDICATOR = {}));

var ANIM;

(function (ANIM) {
  ANIM["DEFAULT"] = "default";
  ANIM["UPDOWN"] = "updown";
  ANIM["FADE"] = "fade";
})(ANIM || (ANIM = {}));

var TRIGGER;

(function (TRIGGER) {
  TRIGGER["HOVER"] = "hover";
  TRIGGER["CLICK"] = "click";
})(TRIGGER || (TRIGGER = {}));

var propsType = {
  width: {
    type: [String, Number],
    "default": 600
  },
  height: {
    type: [String, Number],
    "default": 280
  },
  full: {
    tyep: Boolean,
    "default": false
  },
  arrow: {
    type: String,
    "default": ARROWMNUM.HOVER
  },
  indicator: {
    type: String,
    "default": INDICATOR.INSIDE
  },
  autoplay: {
    type: Boolean,
    "default": true
  },
  interval: {
    type: Number,
    "default": 3000
  },
  anim: {
    type: String,
    "default": ANIM.DEFAULT
  },
  trigger: {
    type: String,
    "default": TRIGGER.CLICK
  },
  index: {
    type: Number,
    "default": 0
  },
  onBeforeChange: {
    type: Function
  },
  onAfterChange: {
    type: Function
  },
  onGoto: Function
};

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

var ELEM_LEFT = 'layui-carousel-left',
    ELEM_RIGHT = 'layui-carousel-right',
    ELEM_PREV = 'layui-carousel-prev',
    ELEM_NEXT = 'layui-carousel-next',
    THIS = 'layui-this';
var ELEM_IND = 'layui-carousel-ind',
    ELEM_ARROW = 'layui-carousel-arrow';
var carousel = vue.defineComponent({
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

    return vue.createVNode("div", {
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
    }, [vue.createVNode("div", {
      "carousel-item": "",
      "ref": function ref(dom) {
        carouselDom = dom;
        if (carouselDom) carouselDom.querySelectorAll('.layui-carousel-item')[index].classList.add(THIS);
      }
    }, [this.$slots["default"]()]), vue.createVNode("div", {
      "class": ELEM_IND,
      "ref": function ref(dom) {
        indicatorDom = dom;
      }
    }, [vue.createVNode("ul", null, [function () {
      var indics = [];

      for (var i = 0; i < childrenLen; i++) {
        indics.push(vue.createVNode("li", vue.mergeProps({
          "class": index === i ? THIS : ''
        }, handleEvent(i)), null));
      }

      return indics;
    }()])]), vue.createVNode("button", {
      "class": "layui-icon  ".concat(ELEM_ARROW),
      "lay-type": "sub",
      "onClick": function onClick() {
        onBeforeChange && onBeforeChange(index, index - 1);
        slide('sub', 1);
      }
    }, [vue.createTextVNode(" "), anim === 'updown' ? vue.createVNode("span", null, [vue.createTextVNode("\uE619")]) : vue.createVNode("span", null, [vue.createTextVNode("\uE603")])]), vue.createVNode("button", {
      "class": "layui-icon ".concat(ELEM_ARROW),
      "lay-type": "add",
      "onClick": function onClick() {
        onBeforeChange && onBeforeChange(index, index + 1);
        slide('add', 1);
      }
    }, [vue.createTextVNode(" "), anim === 'updown' ? vue.createVNode("span", null, [vue.createTextVNode("\uE61A")]) : vue.createVNode("span", null, [vue.createTextVNode("\uE602")]), vue.createTextVNode(" ")])]);
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
});

var index = withInstall(carousel);

module.exports = index;
