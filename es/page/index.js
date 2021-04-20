import { isVNode as _isVNode, createTextVNode as _createTextVNode, createVNode as _createVNode } from "vue";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { defineComponent } from 'vue';
import { withInstall } from '../_utils/component';
import './style/index';
import props from './props';
import { className } from '../_utils/utils'; // TODO : The theme is not tested.

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var DISABLED = 'layui-disabled';
export default withInstall(defineComponent({
  name: 'LayPage',
  props: props,
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
          pager.push(_createVNode("span", {
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
          pager.push(_createVNode("span", {
            "class": "layui-laypage-spr"
          }, [_createTextVNode("\u2026")]));
        } //输出连续页码


        var _loop = function _loop(i) {
          if (i === curr) {
            //当前页
            pager.push(_createVNode("span", {
              "class": "layui-laypage-curr"
            }, [_createVNode("em", {
              "class": "layui-laypage-em",
              "style": {
                backgroundColor: theme
              }
            }, null), _createVNode("em", null, _isSlot(i) ? i : {
              "default": function _default() {
                return [i];
              }
            })]));
          } else {
            pager.push(_createVNode("span", {
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
            pager.push(_createVNode("span", {
              "class": "layui-laypage-spr"
            }, [_createTextVNode("\u2026")]));
          }

          if (groups !== 0) {
            pager.push(_createVNode("span", {
              "class": "layui-laypage-last a",
              "onClick": function onClick() {
                return pageJump(pages);
              }
            }, [_createTextVNode(" "), slots.end ? slots.end() : pages]));
          }
        }

        return pager;
      }();

      return _createVNode("div", {
        "class": "layui-box layui-laypage layui-laypage-default"
      }, [_createVNode("span", {
        "class": className(['layui-laypage-prev', 'a', _defineProperty({}, DISABLED, curr == 1)]),
        "onClick": function onClick() {
          return pageJump(onPrev(curr));
        }
      }, [slots.prev ? slots.prev() : '上一页']), pageView, _createVNode("span", {
        "class": className(['layui-laypage-next', 'a', _defineProperty({}, DISABLED, curr == pages)]),
        "onClick": function onClick() {
          return pageJump(onNext(curr));
        }
      }, [slots.next ? slots.next() : '下一页'])]);
    };
  }
}));