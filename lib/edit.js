/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var propsType = {
  name: {
    type: String,
    "default": true
  },
  tool: {
    type: Array,
    "default": ['strong', 'italic', 'underline', 'del', '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'face', 'image']
  },
  hideTool: {
    type: Array,
    "default": []
  },
  height: {
    type: Number,
    "default": 200
  }
};

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var JQuery = /*#__PURE__*/function () {
  function JQuery(selector) {
    _classCallCheck(this, JQuery);

    this.elem = null;

    if (typeof selector === 'string') {
      // @ts-ignore
      this.elem = _toConsumableArray(document.querySelectorAll(selector));
    } else {
      this.elem = selector;
    }
  }

  _createClass(JQuery, [{
    key: "each",
    value: function each(callback) {
      if (!this.elem) return;

      if (Array.isArray(this.elem)) {
        this.elem.forEach(callback);
      } else {
        callback(this.elem, 0);
      }
    }
  }, {
    key: "eq",
    value: function eq(index) {
      if (Array.isArray(this.elem)) {
        return $(this.elem[index]);
      }

      return this;
    }
  }, {
    key: "find",
    value: function find(selector) {
      if (!this.elem) {
        return null;
      }

      if (Array.isArray(this.elem)) {
        return null;
      } else {
        // @ts-ignore
        return $(_toConsumableArray(this.elem.querySelectorAll(selector)));
      }
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      this.each(function (item, index) {
        item.classList.add(className);
      });
      return this;
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.each(function (item, index) {
        item.classList.remove(className);
      });
      return this;
    }
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      if (!this.elem) return false;

      if (Array.isArray(this.elem)) {
        return false;
      } else {
        return this.elem.classList.contains(className);
      }
    }
  }, {
    key: "setAttr",
    value: function setAttr(key, value) {
      this.each(function (item, index) {
        item.setAttribute(key, value);
      });
      return this;
    }
  }, {
    key: "focus",
    value: function focus() {
      if (!this.elem) return this;

      if (!Array.isArray(this.elem)) {
        // @ts-ignore
        this.elem.focus();
      }

      return this;
    }
  }, {
    key: "getAttr",
    value: function getAttr(key) {
      if (!this.elem) return "";

      if (Array.isArray(this.elem)) {
        return "";
      } else {
        // @ts-ignore
        return this.elem.getAttribute(key);
      }
    }
  }, {
    key: "removeAttr",
    value: function removeAttr(key) {
      return this;
    }
  }, {
    key: "width",
    value: function width() {
      if (!this.elem) return 0;

      if (Array.isArray(this.elem)) {
        return 0;
      } else {
        // @ts-ignore
        return this.elem.offsetWidth;
      }
    }
  }, {
    key: "height",
    value: function height() {
      if (!this.elem) return 0;

      if (Array.isArray(this.elem)) {
        return 0;
      } else {
        // @ts-ignore
        return this.elem.offsetHeight;
      }
    }
  }, {
    key: "top",
    value: function top() {
      // Relative distance to window
      if (!this.elem) return 0;

      if (Array.isArray(this.elem)) {
        return 0;
      } else {
        // @ts-ignore
        return this.elem.getBoundingClientRect().top;
      }
    }
  }, {
    key: "left",
    value: function left() {
      // Relative distance to window
      if (!this.elem) return 0;

      if (Array.isArray(this.elem)) {
        return 0;
      } else {
        // @ts-ignore
        return this.elem.getBoundingClientRect().left;
      }
    }
  }, {
    key: "scrollTop",
    value: function scrollTop() {
      if (!this.elem) return 0;

      if (Array.isArray(this.elem)) {
        return 0;
      } else {
        // @ts-ignore
        return this.elem.scrollTop;
      }
    }
  }, {
    key: "scrollHeight",
    value: function scrollHeight() {
      if (!this.elem) return 0;

      if (Array.isArray(this.elem)) {
        return 0;
      } else {
        // @ts-ignore
        return this.elem.scrollHeight;
      }
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      if (this.elem) {
        if (this.elem === document.documentElement) {
          document.addEventListener(event, callback);
        } else {
          this.each(function (item, index) {
            item.addEventListener(event, callback);
          });
        }
      }

      return this;
    }
  }, {
    key: "html",
    value: function html(innerHTML) {
      if (!this.elem) return "";

      if (Array.isArray(this.elem)) {
        return "";
      } else {
        if (innerHTML !== undefined) {
          this.elem.innerHTML = innerHTML;
          return this;
        } // @ts-ignore


        return this.elem.innerHTML;
      }
    }
  }, {
    key: "parent",
    value: function parent() {
      if (!this.elem) return "";

      if (Array.isArray(this.elem)) {
        return "";
      } else {
        // @ts-ignore
        return $(this.elem.parentNode);
      }
    }
  }, {
    key: "getElem",
    value: function getElem() {
      return this.elem;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.each(function (item) {
        item.remove();
      });
    }
  }, {
    key: "setCss",
    value: function setCss(obj) {
      var _this = this;

      var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        _this.each(function (item) {
          // @ts-ignore
          item.style[key] = value;
        });
      };

      for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
        _loop();
      }

      return this;
    }
  }, {
    key: "getCSS",
    value: function getCSS(key) {
      if (!this.elem) return "";

      if (Array.isArray(this.elem)) {
        return "";
      } else {
        // @ts-ignore
        return this.elem.style[key];
      }
    }
  }]);

  return JQuery;
}();

var $ = function $(selector) {
  if (selector === null) return null;

  if (typeof selector === 'string' && !document.querySelector(selector)) {
    return null;
  }

  return new JQuery(selector);
};

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !vue.isVNode(s);
}

var CHECK = 'layedit-tool-active',
    ABLED = 'layui-disabled'; //Range对象兼容性处理

var Range = function Range(iframeDOM) {
  return iframeDOM.selection ? iframeDOM.selection.createRange() : iframeDOM.getSelection().getRangeAt(0);
}; //当前Range对象的endContainer兼容性处理


var getContainer = function getContainer(range) {
  return range.endContainer || range.parentElement().childNodes[0];
};

var Edit = vue.defineComponent({
  name: 'LayEdit',
  props: propsType,
  data: function data() {
    return {};
  },
  render: function render() {
    var _this = this;

    var _this$$props = this.$props,
        tool = _this$$props.tool,
        hideTool = _this$$props.hideTool,
        height = _this$$props.height,
        name = _this$$props.name;
    var toolsDom;

    var displayTools = function () {
      var node = [],
          ht = {};
      hideTool.forEach(function (item) {
        ht[item] = true;
      });
      tool.forEach(function (item) {
        if (_this.tools[item] && !ht[item]) {
          node.push(_this.tools[item]);
        }
      });
      return node;
    }();

    var filter = function filter(body) {
      body.find('*[style]').each(function (item) {
        // @ts-ignore
        var textAlign = item.style.textAlign;
        item.removeAttribute('style'); // @ts-ignore

        item.style.textAlign = textAlign || ''; //修饰表格

        body.find('table').addClass('layui-table'); //移除不安全的标签

        body.find('script').remove();
        body.find('link').remove();
      });
    };

    var hotkey = function hotkey(iframeWin) {
      var iframeDOM = iframeWin.document;

      if (_this.body) {
        _this.body.on('keydown', function (e) {
          var keycode = e.keyCode; //处理回车

          if (keycode === 13) {
            var range = Range(iframeDOM);
            var container = getContainer(range),
                parentNode = container.parentNode;

            if (parentNode.tagName.toLowerCase() === 'pre') {
              if (e.shiftKey) return;
              alert('请暂时用shift+enter');
              return false;
            }

            iframeWin.execCommand('formatblock', false, '<p>');
          }
        });

        _this.content = _this.body.html(); //处理粘贴

        _this.body.on('paste', function () {
          iframeDOM.execCommand('formatBlock', false, '<p>');
          setTimeout(function () {
            filter(_this.body);
            _this.content = _this.body.html();
          }, 100);
        });
      }
    };

    var click = function click(othis) {
      var iframeDOM = _this.myWindw.document;
      var events = othis.getAttr('layedit-event');
      var command = othis.getAttr('lay-command');
      if (othis.hasClass('layui-disabled')) return;

      _this.body.focus();

      if (command) {
        iframeDOM.execCommand(command);

        if (/justifyLeft|justifyCenter|justifyRight/.test(command)) {
          iframeDOM.execCommand('formatblock', false, '<p>');
        }

        setTimeout(function () {
          _this.body.focus();
        }, 10);
      } else {
        _this.toolEvent[events] && _this.toolEvent[events](Range(iframeDOM));
      } // @ts-ignore


      toolCheck($(toolsDom));
    };

    var handleTools = function handleTools(e) {
      // @ts-ignore
      var othis = $(e.target);

      if (othis) {
        var events = othis.getAttr('layedit-event');
        if (/image/.test(events)) return;
        click(othis);
      }
    };

    var toolCheck = function toolCheck(tools) {
      var _$;

      var iframeDOM = _this.myWindw;
      var container = getContainer(Range(iframeDOM));

      var item = function item(type) {
        return tools.find('.layedit-tool-' + type);
      };

      tools.find('i').removeClass(CHECK);
      item('unlink').addClass(ABLED); // @ts-ignore

      var parent = (_$ = $(container)) === null || _$ === void 0 ? void 0 : _$.parent().getElem();
      var tagName = parent.tagName.toLowerCase();
      var textAlign = parent.style.textAlign; // //文字

      if (tagName === 'b' || tagName === 'strong') {
        item('b').addClass(CHECK);
      }

      if (tagName === 'i' || tagName === 'em') {
        item('i').addClass(CHECK);
      }

      if (tagName === 'u') {
        item('u').addClass(CHECK);
      }

      if (tagName === 'strike') {
        item('d').addClass(CHECK);
      } //对齐


      if (tagName === 'p') {
        if (textAlign === 'center') {
          item('center').addClass(CHECK);
        } else if (textAlign === 'right') {
          item('right').addClass(CHECK);
        } else {
          item('left').addClass(CHECK);
        }
      } // 超链接


      if (tagName === 'a') {
        item('link').addClass(CHECK);
        item('unlink').removeClass(ABLED);
      }
    };

    return vue.createVNode("div", {
      "class": "layui-layedit"
    }, [vue.createVNode("div", {
      "class": "layui-unselect layui-layedit-tool",
      "ref": function ref(dom) {
        toolsDom = dom;
      },
      "onClick": handleTools
    }, _isSlot(displayTools) ? displayTools : {
      "default": function _default() {
        return [displayTools];
      }
    }), vue.createVNode("div", {
      "class": "layui-layedit-iframe",
      "style": {
        height: height + 'px'
      }
    }, [vue.createVNode("iframe", {
      "frameborder": "0",
      "name": 'layui-iframe-' + name,
      "style": {
        height: height + 'px',
        width: '100%'
      },
      "ref": function ref(dom) {
        // @ts-ignore
        dom && dom.addEventListener('load', function () {
          // @ts-ignore
          _this.myWindw = frames['layui-iframe-' + name]; // @ts-ignore

          var head = _this.myWindw.document.querySelector('head');

          head.innerHTML += ['<style>', '*{margin: 0; padding: 0;}', 'body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}', 'a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}', 'p{margin-bottom: 10px;}', 'img{display: inline-block; border: none; vertical-align: middle;}', 'pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}', '</style>'].join('');
          _this.body = $(_this.myWindw.document.body);

          _this.body.setAttr('contenteditable', true).setCss({
            minHeight: height
          }).html('');

          hotkey(_this.myWindw);

          _this.body.on('click', function () {
            // @ts-ignore
            toolCheck($(toolsDom));
          });
        });
      }
    }, null)])]);
  },
  setup: function setup(props) {
    var content = '';
    var myWindw, body;
    var iframeDOM = myWindw.document;
    var toolEvent = {
      //超链接
      link: function link(range) {},
      //清除超链接
      unlink: function unlink(range) {
        iframeDOM.execCommand('unlink');
      }
    };
    var tools = {
      html: [vue.createVNode("i", {
        "class": "layui-icon layedit-tool-html",
        "title": "HTML源代码",
        "lay-command": "html",
        "layedit-event": "html"
      }, [vue.createTextVNode("\uE64B")]), vue.createVNode("span", {
        "class": "layedit-tool-mid"
      }, null)],
      strong: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-b",
        "title": "加粗",
        "lay-command": "Bold",
        "layedit-event": "b"
      }, [vue.createTextVNode("\uE62B")]),
      italic: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-i",
        "title": "斜体",
        "lay-command": "italic",
        "layedit-event": "i"
      }, [vue.createTextVNode("\uE644")]),
      underline: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-u",
        "title": "下划线",
        "lay-command": "underline",
        "layedit-event": "u"
      }, [vue.createTextVNode("\uE646")]),
      del: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-d",
        "title": "删除线",
        "lay-command": "strikeThrough",
        "layedit-event": "d"
      }, [vue.createTextVNode("\uE64F")]),
      '|': vue.createVNode("span", {
        "class": "layedit-tool-mid"
      }, null),
      left: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-left",
        "title": "左对齐",
        "lay-command": "justifyLeft",
        "layedit-event": "lefe"
      }, [vue.createTextVNode("\uE649")]),
      center: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-center",
        "title": "居中对齐",
        "lay-command": "justifyCenter",
        "layedit-event": "center"
      }, [vue.createTextVNode("\uE647")]),
      right: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-right",
        "title": "右对齐",
        "lay-command": "justifyRight",
        "layedit-event": "right"
      }, [vue.createTextVNode("\uE648")]),
      link: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-link",
        "title": "插入链接",
        "layedit-event": "link"
      }, [vue.createTextVNode("\uE64C")]),
      unlink: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-unlink layui-disabled",
        "title": "清除链接",
        "lay-command": "unlink",
        "layedit-event": "unlink"
      }, [vue.createTextVNode("\uE64D")]),
      face: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-face",
        "title": "表情",
        "layedit-event": "face"
      }, [vue.createTextVNode("\uE650")]),
      image: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-image",
        "title": "图片",
        "layedit-event": "image"
      }, [vue.createTextVNode("\uE64A")]),
      code: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-code",
        "title": "插入代码",
        "layedit-event": "code"
      }, [vue.createTextVNode("\uE64E")]),
      help: vue.createVNode("i", {
        "class": "layui-icon layedit-tool-help",
        "title": "帮助",
        "layedit-event": "help"
      }, [vue.createTextVNode("\uE607")])
    };
    return {
      content: content,
      myWindw: myWindw,
      tools: tools,
      body: body,
      toolEvent: toolEvent
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

var index = withInstall(Edit);

module.exports = index;
