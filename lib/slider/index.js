"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _propsType = _interopRequireDefault(require("./propsType"));

var _component = require("../_utils/component");

require("./style/index");

var _utils = require("../_utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LaySlider',
  props: _propsType["default"],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var tipsValue = (0, _vue.ref)(0);
    var tipsShow = (0, _vue.ref)(false);
    return function () {
      var _scaleFir2, _ref3, _ref4;

      var barWH = 0,
          barBL = 0;
      var wrapValues = [0, 0];
      var wrapBtnsDom = [];
      var wrapDom, tempDom, wrapDom2;
      var step = props.step,
          max = props.max,
          min = props.min,
          range = props.range,
          modelValue = props.modelValue,
          color = props.color; // 间隔值不能小于 1

      if (step < 1) step = 1; // 最大值不能小于最小值

      if (max < min) max = min + step; // 判断是否开启双滑块

      var scaleFir, scaleSec, scale;

      if (range) {
        var _scaleFir;

        modelValue = Array.isArray(modelValue) ? modelValue : [min, modelValue];
        var minValue = Math.min(modelValue[0], modelValue[1]),
            maxValue = Math.max(modelValue[0], modelValue[1]);
        modelValue[0] = minValue > min ? minValue : min;
        modelValue[1] = maxValue > min ? maxValue : min;
        modelValue[0] = modelValue[0] > max ? max : modelValue[0];
        modelValue[1] = modelValue[1] > max ? max : modelValue[1];
        scaleFir = Math.floor((modelValue[0] - min) / (max - min) * 100);
        scaleSec = Math.floor((modelValue[1] - min) / (max - min) * 100);
        scale = scaleSec - scaleFir;
        wrapValues[0] = (_scaleFir = scaleFir) !== null && _scaleFir !== void 0 ? _scaleFir : scale;
        wrapValues[1] = scaleSec;
      } else {
        // 如果初始值是一个数组，则获取数组的最小值
        if (Array.isArray(modelValue)) {
          modelValue = Math.min.apply(Math, _toConsumableArray(modelValue));
        } // 初始值不能小于最小值且不能大于最大值


        if (modelValue < min) modelValue = min;
        if (modelValue > max) modelValue = max;
        scale = Math.floor((modelValue - min) / (max - min) * 100);
        wrapValues[0] = scale;
      }

      barWH = scale; // @ts-ignore

      barBL = (_scaleFir2 = scaleFir) !== null && _scaleFir2 !== void 0 ? _scaleFir2 : 0;
      var sliderWidth; // 用于记录上一次值，值未变时，不触发change回调函数

      var lastValue = 0,
          lastValues = [0, 0];
      var stepM = 100 / ((max - min) / Math.ceil(step));

      var valueTo = function valueTo(value) {
        var oldLeft = value / sliderWidth * 100 / stepM;
        var left = Math.round(oldLeft) * stepM;

        if (value === sliderWidth) {
          left = Math.ceil(oldLeft) * stepM;
        }

        return left;
      }; // 滑动改变位置函数


      var change = function change(index, offsetValue) {
        if (Math.ceil(offsetValue) * stepM > 100) {
          offsetValue = Math.ceil(offsetValue) * stepM;
        } else {
          offsetValue = Math.round(offsetValue) * stepM;
        }

        offsetValue = offsetValue > 100 ? 100 : offsetValue;
        wrapValues[index] = offsetValue;
        var firLeft = valueTo(wrapDom.offsetLeft),
            secLeft = range ? valueTo(wrapDom2.offsetLeft) : 0;
        tipsValue.value = offsetValue;

        if (props.vertical) {
          // sliderAct.find('.' + SLIDER_TIPS).css({"bottom":offsetValue + '%', "margin-bottom":"20px"});
          firLeft = valueTo(sliderWidth - wrapDom.offsetTop - wrapDom.offsetHeight);
          secLeft = range ? valueTo(sliderWidth - wrapDom2.offsetTop - wrapDom.offsetHeight) : 0;
        }

        firLeft = firLeft > 100 ? 100 : firLeft;
        secLeft = secLeft > 100 ? 100 : secLeft;
        barWH = Math.abs(firLeft - secLeft);
        barBL = Math.min(firLeft, secLeft);
        var selfValue = min + Math.round((max - min) * offsetValue / 100); // 如果开启范围选择，则返回数组值

        if (props.range) {
          var arrValue = [wrapValues[0], wrapValues[1]];
          if (arrValue[0] > arrValue[1]) arrValue.reverse(); // 如果前面的圆点超过了后面的圆点值，则调换顺序

          if (!(0, _utils.arrayEqual)(lastValues, arrValue)) {
            lastValues = arrValue;
            emit('update:modelValue', arrValue);
            props.onChange && props.onChange(arrValue);
          }
        } else {
          if (lastValue !== selfValue) {
            emit('update:modelValue', selfValue);
            lastValue = selfValue;
            props.onChange && props.onChange(selfValue);
          }
        }
      };

      var createMoveElem = function createMoveElem(move, up) {
        var upCall = function upCall() {
          up && up();
          document.removeEventListener('mousemove', move);
          document.removeEventListener('mouseup', upCall);
          document.removeEventListener('mouseleave', upCall);
        };

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', upCall);
        document.addEventListener('mouseleave', upCall);
      };

      var _onMousedown = function onMousedown(index, e) {
        if (props.disabled) return;
        sliderWidth = props.vertical ? tempDom.offsetHeight : tempDom.offsetWidth;
        var dom = wrapBtnsDom[index];
        var oldleft = dom.parentNode.offsetLeft;
        var oldx = e.clientX;

        if (props.vertical) {
          oldleft = sliderWidth - dom.parentNode.offsetTop - wrapDom.offsetHeight;
          oldx = e.clientY;
        }

        var move = function move(e) {
          var left = oldleft + (props.vertical ? oldx - e.clientY : e.clientX - oldx);
          if (left < 0) left = 0;
          if (left > sliderWidth) left = sliderWidth;
          var reaLeft = left / sliderWidth * 100 / stepM;
          change(index, reaLeft);
          dom.classList.add('layui-slider-hover');
          tipsShow.value = true;
          e.preventDefault();
        };

        var up = function up() {
          dom.classList.remove('layui-slider-hover');
          tipsShow.value = false;
        };

        createMoveElem(move, up);
      }; // 渲染 step


      var stepRender = [];

      if (props.showstep) {
        var number = (max - min) / step;

        for (var i = 1; i < number + 1; i++) {
          var _step = i * 100 / number;

          if (_step < 100) {
            stepRender.push((0, _vue.createVNode)("div", {
              "class": "layui-slider-step",
              "style": _defineProperty({}, props.vertical ? 'bottom' : 'left', _step + '%')
            }, null));
          }
        }
      } // disabled 状态


      if (props.disabled) {
        color = '#c2c2c2';
      }

      return (0, _vue.createVNode)("div", {
        "class": 'layui-slider ' + (props.vertical ? 'layui-slider-vertical ' : ' ') + (props.disabled ? 'layui-disabled' : ''),
        "ref": function ref(dom) {
          tempDom = dom;
        },
        "style": {
          height: props.height
        }
      }, [props.tips && tipsShow.value && (0, _vue.createVNode)("div", {
        "class": 'layui-slider-tips',
        "style": (_ref3 = {}, _defineProperty(_ref3, props.vertical ? 'bottom' : 'left', tipsValue.value + '%'), _defineProperty(_ref3, "marginBottom", "".concat(props.vertical ? '20px' : '')), _defineProperty(_ref3, "backgroundColor", props.tipsColor), _defineProperty(_ref3, "color", props.textColor), _ref3)
      }, [min + Math.round((max - min) * tipsValue.value / 100)]), (0, _vue.createVNode)("div", {
        "class": 'layui-slider-bar',
        "style": (_ref4 = {
          backgroundColor: color
        }, _defineProperty(_ref4, props.vertical ? 'height' : 'width', barWH + '%'), _defineProperty(_ref4, props.vertical ? 'bottom' : 'left', barBL + '%'), _ref4)
      }, null), (0, _vue.createVNode)("div", {
        "class": 'layui-slider-wrap',
        "style": _defineProperty({}, props.vertical ? 'bottom' : 'left', wrapValues[0] + '%'),
        "ref": function ref(dom) {
          wrapDom = dom;
        }
      }, [(0, _vue.createVNode)("div", {
        "class": 'layui-slider-wrap-btn ' + (props.disabled ? 'layui-disabled' : ''),
        "style": {
          border: "2px solid ".concat(color)
        },
        "ref": function ref(dom) {
          wrapBtnsDom[0] = dom;
        },
        "onMousedown": function onMousedown(e) {
          return _onMousedown(0, e);
        }
      }, null)]), range && (0, _vue.createVNode)("div", {
        "class": 'layui-slider-wrap',
        "style": _defineProperty({}, props.vertical ? 'bottom' : 'left', wrapValues[1] + '%'),
        "ref": function ref(dom) {
          wrapDom2 = dom;
        }
      }, [(0, _vue.createVNode)("div", {
        "class": 'layui-slider-wrap-btn ' + (props.disabled ? 'layui-disabled' : ''),
        "style": {
          border: "2px solid ".concat(color)
        },
        "ref": function ref(dom) {
          wrapBtnsDom[1] = dom;
        },
        "onMousedown": function onMousedown(e) {
          return _onMousedown(1, e);
        }
      }, null)]), stepRender]);
    };
  }
}));

exports["default"] = _default;