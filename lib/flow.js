/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var JQuery = /*#__PURE__*/function () {
  function JQuery(selector) {
    _classCallCheck(this, JQuery);

    this.elem = null;

    if (typeof selector === 'string') {
      this.elem = document.querySelector(selector);
    } else {
      this.elem = selector;
    }
  }

  _createClass(JQuery, [{
    key: "addClass",
    value: function addClass(className) {
      this.elem && this.elem.classList.add(className);
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.elem && this.elem.classList.remove(className);
    }
  }, {
    key: "setAttr",
    value: function setAttr(key, value) {
      this.elem && this.elem.setAttribute(key, value);
    }
  }, {
    key: "removeAttr",
    value: function removeAttr(key) {
      this.elem && this.elem.removeAttribute(key);
    }
  }, {
    key: "width",
    value: function width() {
      if (this.elem) {
        // @ts-ignore
        return this.elem.offsetWidth;
      }

      return 0;
    }
  }, {
    key: "height",
    value: function height() {
      if (this.elem) {
        // @ts-ignore
        return this.elem.offsetHeight;
      }

      return 0;
    }
  }, {
    key: "top",
    value: function top() {
      // Relative distance to window
      if (this.elem) {
        return this.elem.getBoundingClientRect().top;
      }

      return 0;
    }
  }, {
    key: "left",
    value: function left() {
      // Relative distance to window
      if (this.elem) {
        return this.elem.getBoundingClientRect().left;
      }

      return 0;
    }
  }, {
    key: "scrollTop",
    value: function scrollTop() {
      if (this.elem) {
        return this.elem.scrollTop;
      }

      return 0;
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      if (this.elem) {
        if (this.elem === document.documentElement) {
          document.addEventListener(event, callback);
        } else {
          this.elem.addEventListener(event, callback);
        }
      }
    }
  }, {
    key: "scrollHeight",
    value: function scrollHeight() {
      if (this.elem) {
        return this.elem.scrollHeight;
      }

      return 0;
    }
  }]);

  return JQuery;
}();

var $ = function $(selector) {
  if (typeof selector === 'string' && !document.querySelector(selector)) {
    return null;
  }

  return new JQuery(selector);
};

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !vue.isVNode(s);
}

var flow = vue.defineComponent({
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
    var lock = vue.ref(false);
    var isOver = vue.ref(false);

    var next = function next(conditions) {
      isOver.value = conditions;
      lock.value = false;
    };

    var done = function done() {
      lock.value = true;
      props.onDone(++page, next);
    };

    vue.onUnmounted(function () {
      if (timer) clearTimeout(timer);
    });
    vue.onMounted(function () {
      done();
    });
    vue.onBeforeUpdate(function () {
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
    var endRender = slots.end ? slots.end() : vue.createVNode("span", null, [vue.createTextVNode("\u6CA1\u6709\u66F4\u591A\u4E86")]);
    var loadingRender = slots.loading ? slots.loading() : vue.createVNode("b", null, [vue.createVNode("i", {
      "class": "layui-flow-loadin-icon layui-icon"
    }, [vue.createTextVNode("\uE63E")])]);
    var notAutoRender = slots.notAuto ? slots.notAuto() : vue.createVNode("span", {
      "class": "layui-loading-more"
    }, [vue.createTextVNode("\u52A0\u8F7D\u66F4\u591A")]);
    return function () {
      return vue.createVNode("div", {
        "class": height && "layui-flow",
        "ref": function ref(dom) {
          selfDom = dom;
        },
        "style": {
          height: typeof height === "number" ? height + 'px' : height
        }
      }, [slots["default"] && slots["default"](), vue.createVNode("div", {
        "class": "layui-flow-more"
      }, [lock.value ? loadingRender : isOver.value ? vue.createVNode("span", {
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
});

var withInstall = function withInstall(comp) {
  var c = comp;

  c.install = function (app) {
    app.component(c.displayName || c.name, comp);
  };

  return comp;
};

var index = withInstall(flow);

module.exports = index;
