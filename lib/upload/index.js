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

var _utils = require("../_utils/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// notice : 插槽不能使用定位
var _default = (0, _component.withInstall)((0, _vue.defineComponent)({
  name: 'LayUpload',
  props: _propsType["default"],
  data: function data() {
    return {
      dragOver: false
    };
  },
  render: function render() {
    var _this = this;

    var _this$$props = this.$props,
        acceptMime = _this$$props.acceptMime,
        accept = _this$$props.accept,
        exts = _this$$props.exts,
        field = _this$$props.field,
        multiple = _this$$props.multiple,
        url = _this$$props.url,
        data = _this$$props.data,
        headers = _this$$props.headers,
        size = _this$$props.size,
        limit = _this$$props.limit,
        drag = _this$$props.drag,
        auto = _this$$props.auto,
        onSuccess = _this$$props.onSuccess,
        onError = _this$$props.onError,
        onAllDone = _this$$props.onAllDone,
        onUploadBefore = _this$$props.onUploadBefore,
        onPreview = _this$$props.onPreview,
        onChoose = _this$$props.onChoose;
    var successful = 0;
    var aborted = 0; // 判断文件类型

    var isExts = function isExts(file) {
      var filename = file.name;
      var check = true;

      switch (accept) {
        case 'file':
          //一般文件
          if (exts && !RegExp('\\w\\.(' + exts + ')$', 'i').test(escape(filename))) {
            check = false;
          }

          break;

        case 'video':
          //视频文件
          if (!RegExp('\\w\\.(' + (exts || 'avi|mp4|wma|rmvb|rm|flash|3gp|flv') + ')$', 'i').test(escape(filename))) {
            check = false;
          }

          break;

        case 'audio':
          //音频文件
          if (!RegExp('\\w\\.(' + (exts || 'mp3|wav|mid') + ')$', 'i').test(escape(filename))) {
            return false;
          }

          break;

        default:
          //图片文件
          if (!RegExp('\\w\\.(' + (exts || 'jpg|png|gif|bmp|jpeg|webp$') + ')', 'i').test(escape(filename))) {
            return false;
          }

          break;
      }

      if (!check) {
        onError && onError(_propsType.ErrorStatus.extsError, file, _this.chooseFiles);
      }

      return check;
    }; // 上传文件


    this.upload = function () {
      // 多文件全部上传完毕的回调
      var allDone = function allDone() {
        if (multiple && successful + aborted === _this.chooseFiles.length) {
          onAllDone && onAllDone({
            total: _this.chooseFiles.length,
            successful: successful,
            aborted: aborted
          }, _this.chooseFiles);
          _this.chooseFiles = [];
        }
      };

      _this.chooseFiles.forEach(function (file, i) {
        var formData = new FormData();
        formData.append(field, file);

        if (typeof data === 'function') {
          var d = data(file);

          for (var key in d) {
            formData.append(key, JSON.stringify(d[key]));
          }
        } else {
          for (var _key in data) {
            formData.append(_key, JSON.stringify(data[_key]));
          }
        }

        var opts = {
          url: url,
          type: 'POST',
          data: formData,
          headers: headers,
          success: function success(res) {
            successful++;
            onSuccess && onSuccess(res, i);
            allDone();
          },
          error: function error() {
            aborted++;
            onError && onError(_propsType.ErrorStatus.requestError, file, _this.chooseFiles);
            allDone();
          }
        };
        var isUpload = onUploadBefore && onUploadBefore(file, i, _this.chooseFiles);
        if (isUpload === false) return; // @ts-ignore

        (0, _utils.ajax)(opts);
      });
    }; //设置当前选择的文件队列


    var setChooseFile = function setChooseFile(files) {
      var choose = Object.values(files);
      onChoose && onChoose(choose, _this.chooseFiles); // 文件数量限定

      if (limit > 0 && _this.chooseFiles.length > limit) {
        onError && onError(_propsType.ErrorStatus.numberError, _this.chooseFiles[0], _this.chooseFiles);
        return;
      }

      choose.forEach(function (file, i) {
        if (!isExts(file)) return;

        if (size > 0 && file.size > 1024 * size) {
          onError && onError(_propsType.ErrorStatus.sizeError, file, _this.chooseFiles);
          return;
        }

        if (onPreview) {
          var reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = function () {
            // @ts-ignore
            onPreview && onPreview(reader.result, file, i, _this.chooseFiles);
          };
        }

        _this.chooseFiles.push(file);
      });
      if (auto) _this.upload();
    };

    var child = this.$slots["default"];
    return (0, _vue.createVNode)("div", {
      "class": "layui-upload"
    }, [(0, _vue.createVNode)("div", {
      "class": (0, _utils.className)({
        'layui-upload-drag': !child && drag,
        'lay-over': !child && drag && this.dragOver,
        'layui-btn': !child && !drag
      }),
      "onClick": function onClick() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = acceptMime;
        input.multiple = multiple;
        input.addEventListener("change", function (e) {
          // @ts-ignore
          setChooseFile(e.target.files);
        });
        input.click();
      },
      "onDragover": function onDragover(e) {
        if (!drag) return;
        e.preventDefault();
        _this.dragOver = true;
      },
      "onDragleave": function onDragleave(e) {
        if (!drag) return;
        e.preventDefault();
        _this.dragOver = false;
      },
      "onDrop": function onDrop(e) {
        if (!drag) return;
        e.preventDefault(); // @ts-ignore

        var files = e.dataTransfer.files;
        _this.dragOver = false;
        setChooseFile(files);
      }
    }, [child ? child() : drag ? (0, _vue.createVNode)(_vue.Fragment, null, [(0, _vue.createVNode)("i", {
      "class": "layui-icon"
    }, [(0, _vue.createTextVNode)("\uE67C")]), (0, _vue.createVNode)("p", null, [(0, _vue.createTextVNode)("\u70B9\u51FB\u4E0A\u4F20\uFF0C\u6216\u5C06\u6587\u4EF6\u62D6\u62FD\u5230\u6B64\u5904")])]) : (0, _vue.createVNode)(_vue.Fragment, null, [(0, _vue.createVNode)("i", {
      "class": "layui-icon"
    }, [(0, _vue.createTextVNode)("\uE67C")]), (0, _vue.createTextVNode)("\u4E0A\u4F20\u56FE\u7247")])])]);
  },
  setup: function setup() {
    var upload;
    var chooseFiles = [];
    return {
      // @ts-ignore
      upload: upload,
      chooseFiles: chooseFiles
    };
  }
}));

exports["default"] = _default;