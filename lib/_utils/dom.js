"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.JQuery = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

exports.JQuery = JQuery;

var $ = function $(selector) {
  if (selector === null) return null;

  if (typeof selector === 'string' && !document.querySelector(selector)) {
    return null;
  }

  return new JQuery(selector);
};

var _default = $;
exports["default"] = _default;