"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _component = require("../_utils/component");

require("./style/index");

var _props = _interopRequireDefault(require("./props"));

var _utils = require("../_utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0, _vue.isVNode)(s);
}

// TODO : The theme is not tested.
var DISABLED = 'layui-disabled';

var _default2 = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayPage',
  props: _props["default"],
  // @ts-ignore
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    return function () {
      var groups = props.groups,
          modelValue = props.modelValue,
          count = props.count,
          theme = props.theme,
          limit = props.limit,
          onJump = props.onJump,
          onPrev = props.onPrev,
          onNext = props.onNext; //数据取整

      var curr = modelValue | 0;
      groups = groups | 0;
      count = count | 0;
      limit = limit | 0;
      var pages = Math.ceil(count / limit) || 1; //当前页不能超过总页数

      if (curr > pages) {
        curr = pages;
      } //连续分页个数不能低于0且不能大于总页数


      if (groups < 0) {
        groups = 1;
      } else if (groups > pages) {
        groups = pages;
      } //计算当前组


      var index = pages > groups ? Math.ceil((curr + (groups > 1 ? 1 : 0)) / (groups > 0 ? groups : 1)) : 1;

      var pageJump = function pageJump(dataPage) {
        var curr = dataPage | 0;
        if (curr < 1 || curr > pages) return;
        onJump && onJump(curr);
        emit('update:modelValue', curr);
      };

      var pageView = function () {
        var pager = [];
        if (count < 1) return ''; //首页

        if (index > 1 && groups !== 0) {
          pager.push((0, _vue.createVNode)("span", {
            "class": "layui-laypage-first a",
            "onClick": function onClick() {
              return pageJump(1);
            }
          }, [slots.first ? slots.first() : '1']));
        } //计算当前页码组的起始页


        var halve = Math.floor((groups - 1) / 2); //页码数等分

        var start = index > 1 ? curr - halve : 1;
        var end = index > 1 ? function () {
          var max = curr + (groups - halve - 1);
          return max > pages ? pages : max;
        }() : groups; //防止最后一组出现“不规定”的连续页码数

        if (end - start < groups - 1) {
          start = end - groups + 1;
        } //输出左分割符


        if (start > 2) {
          pager.push((0, _vue.createVNode)("span", {
            "class": "layui-laypage-spr"
          }, [(0, _vue.createTextVNode)("\u2026")]));
        } //输出连续页码


        var _loop = function _loop(i) {
          if (i === curr) {
            //当前页
            pager.push((0, _vue.createVNode)("span", {
              "class": "layui-laypage-curr"
            }, [(0, _vue.createVNode)("em", {
              "class": "layui-laypage-em",
              "style": {
                backgroundColor: theme
              }
            }, null), (0, _vue.createVNode)("em", null, _isSlot(i) ? i : {
              "default": function _default() {
                return [i];
              }
            })]));
          } else {
            pager.push((0, _vue.createVNode)("span", {
              "class": "a",
              "onClick": function onClick() {
                pageJump(i);
              }
            }, _isSlot(i) ? i : {
              "default": function _default() {
                return [i];
              }
            }));
          }
        };

        for (var i = start; i <= end; i++) {
          _loop(i);
        } //输出输出右分隔符 & 末页


        if (pages > groups && pages > end) {
          if (end + 1 < pages) {
            pager.push((0, _vue.createVNode)("span", {
              "class": "layui-laypage-spr"
            }, [(0, _vue.createTextVNode)("\u2026")]));
          }

          if (groups !== 0) {
            pager.push((0, _vue.createVNode)("span", {
              "class": "layui-laypage-last a",
              "onClick": function onClick() {
                return pageJump(pages);
              }
            }, [(0, _vue.createTextVNode)(" "), slots.end ? slots.end() : pages]));
          }
        }

        return pager;
      }();

      return (0, _vue.createVNode)("div", {
        "class": "layui-box layui-laypage layui-laypage-default"
      }, [(0, _vue.createVNode)("span", {
        "class": (0, _utils.className)(['layui-laypage-prev', 'a', _defineProperty({}, DISABLED, curr == 1)]),
        "onClick": function onClick() {
          return pageJump(onPrev(curr));
        }
      }, [slots.prev ? slots.prev() : '上一页']), pageView, (0, _vue.createVNode)("span", {
        "class": (0, _utils.className)(['layui-laypage-next', 'a', _defineProperty({}, DISABLED, curr == pages)]),
        "onClick": function onClick() {
          return pageJump(onNext(curr));
        }
      }, [slots.next ? slots.next() : '下一页'])]);
    };
  }
}));

exports["default"] = _default2;