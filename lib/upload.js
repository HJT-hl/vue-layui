/* * Copyright © 2021-2021 siluxianren * Released under the MIT License. */
'use strict';

var vue = require('vue');

var ErrorStatus;

(function (ErrorStatus) {
  ErrorStatus[ErrorStatus["extsError"] = 0] = "extsError";
  ErrorStatus[ErrorStatus["sizeError"] = 1] = "sizeError";
  ErrorStatus[ErrorStatus["numberError"] = 2] = "numberError";
  ErrorStatus[ErrorStatus["requestError"] = 3] = "requestError";
})(ErrorStatus || (ErrorStatus = {}));

var propsType = {
  url: {
    type: String,
    required: true
  },
  drag: {
    type: Boolean,
    "default": false
  },
  data: {
    type: [Object, Function],
    "default": {}
  },
  auto: {
    type: Boolean,
    "default": true
  },
  acceptMime: {
    type: String,
    "default": 'image/*'
  },
  accept: {
    type: String,
    "default": 'images'
  },
  exts: {
    type: String,
    "default": ''
  },
  field: {
    type: String,
    "default": 'file'
  },
  multiple: {
    type: Boolean,
    "default": false
  },
  headers: {
    type: Object,
    "default": {}
  },
  size: {
    type: Number,
    "default": 0
  },
  limit: {
    type: Number,
    "default": 0
  },
  onAllDone: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onError: {
    type: Function
  },
  onUploadBefore: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onChoose: {
    type: Function
  }
};

function className(name) {
  var classs = [];

  if (name.toString() === '[object Object]') {
    for (var key in name) {
      // @ts-ignore
      if (name[key]) {
        classs.push(key);
      }
    }
  }

  if (Array.isArray(name)) {
    name.forEach(function (item) {
      if (typeof item === 'string') {
        classs.push(item);
      } else if (item.toString() === '[object Object]') {
        for (var _key in item) {
          if (item[_key]) {
            classs.push(_key);
          }
        }
      }
    });
  }

  return classs.join(' ');
}
function ajax(options) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        options.success(JSON.parse(xhr.responseText));
      } else {
        options.error();
      }
    }
  };

  for (var key in options.headers) {
    xhr.setRequestHeader(key, options.headers[key]);
  }

  xhr.open(options.type, options.url, true);
  xhr.send(options.data);
}

var Upload = vue.defineComponent({
  name: 'LayUpload',
  props: propsType,
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
        onError && onError(ErrorStatus.extsError, file, _this.chooseFiles);
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
            onError && onError(ErrorStatus.requestError, file, _this.chooseFiles);
            allDone();
          }
        };
        var isUpload = onUploadBefore && onUploadBefore(file, i, _this.chooseFiles);
        if (isUpload === false) return; // @ts-ignore

        ajax(opts);
      });
    }; //设置当前选择的文件队列


    var setChooseFile = function setChooseFile(files) {
      var choose = Object.values(files);
      onChoose && onChoose(choose, _this.chooseFiles); // 文件数量限定

      if (limit > 0 && _this.chooseFiles.length > limit) {
        onError && onError(ErrorStatus.numberError, _this.chooseFiles[0], _this.chooseFiles);
        return;
      }

      choose.forEach(function (file, i) {
        if (!isExts(file)) return;

        if (size > 0 && file.size > 1024 * size) {
          onError && onError(ErrorStatus.sizeError, file, _this.chooseFiles);
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
    return vue.createVNode("div", {
      "class": "layui-upload"
    }, [vue.createVNode("div", {
      "class": className({
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
    }, [child ? child() : drag ? vue.createVNode(vue.Fragment, null, [vue.createVNode("i", {
      "class": "layui-icon"
    }, [vue.createTextVNode("\uE67C")]), vue.createVNode("p", null, [vue.createTextVNode("\u70B9\u51FB\u4E0A\u4F20\uFF0C\u6216\u5C06\u6587\u4EF6\u62D6\u62FD\u5230\u6B64\u5904")])]) : vue.createVNode(vue.Fragment, null, [vue.createVNode("i", {
      "class": "layui-icon"
    }, [vue.createTextVNode("\uE67C")]), vue.createTextVNode("\u4E0A\u4F20\u56FE\u7247")])])]);
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
});

var withInstall = function withInstall(comp) {
  var c = comp;

  c.install = function (app) {
    app.component(c.displayName || c.name, comp);
  };

  return comp;
};

var index = withInstall(Upload);

module.exports = index;
