"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerElement = triggerElement;
exports.arrayEqual = arrayEqual;
exports.className = className;
exports.deepCopy = deepCopy;
exports.ajax = ajax;
exports.emptyFun = exports.toLine = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var toLine = function toLine(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};

exports.toLine = toLine;

var emptyFun = function emptyFun() {// 空函数
};

exports.emptyFun = emptyFun;

function triggerElement(arr, item) {
  var index = arr.indexOf(item);

  if (index === -1) {
    arr.push(item);
  } else {
    arr.splice(index, 1);
  }

  return arr;
}

function arrayEqual(obj1, obj2) {
  for (var i = 0; i < obj1.length; i++) {
    if (obj1[i] !== obj2[i]) return false;
  }

  return true;
}

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

function deepCopy(obj) {
  var deepClone1 = function deepClone1(obj) {
    var res = obj;

    if (Array.isArray(obj)) {
      res = [];

      var _iterator = _createForOfIteratorHelper(obj),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;
          res.push(deepClone1(value));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else if (_typeof(obj) === 'object') {
      res = {};

      for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        res[key] = deepClone1(obj[key]);
      }
    }

    return res;
  };

  var deepClone2 = function deepClone2(obj) {
    return JSON.parse(JSON.stringify(obj));
  };

  return Object.keys(obj).length > 1000 ? deepClone1(obj) : deepClone2(obj);
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