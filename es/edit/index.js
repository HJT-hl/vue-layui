import { createTextVNode as _createTextVNode, createVNode as _createVNode, isVNode as _isVNode } from "vue";
import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
import propsType from './propsType';
import $ from '../_utils/dom'; // TODO : 解决引入其他文件问题

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var CHECK = 'layedit-tool-active',
    ABLED = 'layui-disabled'; //Range对象兼容性处理

var Range = function Range(iframeDOM) {
  return iframeDOM.selection ? iframeDOM.selection.createRange() : iframeDOM.getSelection().getRangeAt(0);
}; //当前Range对象的endContainer兼容性处理


var getContainer = function getContainer(range) {
  return range.endContainer || range.parentElement().childNodes[0];
};

export default withInstall(defineComponent({
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

    return _createVNode("div", {
      "class": "layui-layedit"
    }, [_createVNode("div", {
      "class": "layui-unselect layui-layedit-tool",
      "ref": function ref(dom) {
        toolsDom = dom;
      },
      "onClick": handleTools
    }, _isSlot(displayTools) ? displayTools : {
      "default": function _default() {
        return [displayTools];
      }
    }), _createVNode("div", {
      "class": "layui-layedit-iframe",
      "style": {
        height: height + 'px'
      }
    }, [_createVNode("iframe", {
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

          head.innerHTML += ['<style>', '*{margin: 0; padding: 0;}', 'body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; fonts: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}', 'a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}', 'p{margin-bottom: 10px;}', 'img{display: inline-block; border: none; vertical-align: middle;}', 'pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; fonts-family: Courier New; fonts-size: 12px;}', '</style>'].join('');
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
      html: [_createVNode("i", {
        "class": "layui-icon layedit-tool-html",
        "title": "HTML源代码",
        "lay-command": "html",
        "layedit-event": "html"
      }, [_createTextVNode("\uE64B")]), _createVNode("span", {
        "class": "layedit-tool-mid"
      }, null)],
      strong: _createVNode("i", {
        "class": "layui-icon layedit-tool-b",
        "title": "加粗",
        "lay-command": "Bold",
        "layedit-event": "b"
      }, [_createTextVNode("\uE62B")]),
      italic: _createVNode("i", {
        "class": "layui-icon layedit-tool-i",
        "title": "斜体",
        "lay-command": "italic",
        "layedit-event": "i"
      }, [_createTextVNode("\uE644")]),
      underline: _createVNode("i", {
        "class": "layui-icon layedit-tool-u",
        "title": "下划线",
        "lay-command": "underline",
        "layedit-event": "u"
      }, [_createTextVNode("\uE646")]),
      del: _createVNode("i", {
        "class": "layui-icon layedit-tool-d",
        "title": "删除线",
        "lay-command": "strikeThrough",
        "layedit-event": "d"
      }, [_createTextVNode("\uE64F")]),
      '|': _createVNode("span", {
        "class": "layedit-tool-mid"
      }, null),
      left: _createVNode("i", {
        "class": "layui-icon layedit-tool-left",
        "title": "左对齐",
        "lay-command": "justifyLeft",
        "layedit-event": "lefe"
      }, [_createTextVNode("\uE649")]),
      center: _createVNode("i", {
        "class": "layui-icon layedit-tool-center",
        "title": "居中对齐",
        "lay-command": "justifyCenter",
        "layedit-event": "center"
      }, [_createTextVNode("\uE647")]),
      right: _createVNode("i", {
        "class": "layui-icon layedit-tool-right",
        "title": "右对齐",
        "lay-command": "justifyRight",
        "layedit-event": "right"
      }, [_createTextVNode("\uE648")]),
      link: _createVNode("i", {
        "class": "layui-icon layedit-tool-link",
        "title": "插入链接",
        "layedit-event": "link"
      }, [_createTextVNode("\uE64C")]),
      unlink: _createVNode("i", {
        "class": "layui-icon layedit-tool-unlink layui-disabled",
        "title": "清除链接",
        "lay-command": "unlink",
        "layedit-event": "unlink"
      }, [_createTextVNode("\uE64D")]),
      face: _createVNode("i", {
        "class": "layui-icon layedit-tool-face",
        "title": "表情",
        "layedit-event": "face"
      }, [_createTextVNode("\uE650")]),
      image: _createVNode("i", {
        "class": "layui-icon layedit-tool-image",
        "title": "图片",
        "layedit-event": "image"
      }, [_createTextVNode("\uE64A")]),
      code: _createVNode("i", {
        "class": "layui-icon layedit-tool-code",
        "title": "插入代码",
        "layedit-event": "code"
      }, [_createTextVNode("\uE64E")]),
      help: _createVNode("i", {
        "class": "layui-icon layedit-tool-help",
        "title": "帮助",
        "layedit-event": "help"
      }, [_createTextVNode("\uE607")])
    };
    return {
      content: content,
      myWindw: myWindw,
      tools: tools,
      body: body,
      toolEvent: toolEvent
    };
  }
}));