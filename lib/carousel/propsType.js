"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TRIGGER = exports.ANIM = exports.INDICATOR = exports.ARROWMNUM = void 0;
var ARROWMNUM;
exports.ARROWMNUM = ARROWMNUM;

(function (ARROWMNUM) {
  ARROWMNUM["HOVER"] = "hover";
  ARROWMNUM["ALWAYS"] = "always";
  ARROWMNUM["NONE"] = "none";
})(ARROWMNUM || (exports.ARROWMNUM = ARROWMNUM = {}));

var INDICATOR;
exports.INDICATOR = INDICATOR;

(function (INDICATOR) {
  INDICATOR["INSIDE"] = "inside";
  INDICATOR["OUTSIDE"] = "outside";
  INDICATOR["NONE"] = "none";
})(INDICATOR || (exports.INDICATOR = INDICATOR = {}));

var ANIM;
exports.ANIM = ANIM;

(function (ANIM) {
  ANIM["DEFAULT"] = "default";
  ANIM["UPDOWN"] = "updown";
  ANIM["FADE"] = "fade";
})(ANIM || (exports.ANIM = ANIM = {}));

var TRIGGER;
exports.TRIGGER = TRIGGER;

(function (TRIGGER) {
  TRIGGER["HOVER"] = "hover";
  TRIGGER["CLICK"] = "click";
})(TRIGGER || (exports.TRIGGER = TRIGGER = {}));

var _default = {
  width: {
    type: [String, Number],
    "default": 600
  },
  height: {
    type: [String, Number],
    "default": 280
  },
  full: {
    tyep: Boolean,
    "default": false
  },
  arrow: {
    type: String,
    "default": ARROWMNUM.HOVER
  },
  indicator: {
    type: String,
    "default": INDICATOR.INSIDE
  },
  autoplay: {
    type: Boolean,
    "default": true
  },
  interval: {
    type: Number,
    "default": 3000
  },
  anim: {
    type: String,
    "default": ANIM.DEFAULT
  },
  trigger: {
    type: String,
    "default": TRIGGER.CLICK
  },
  index: {
    type: Number,
    "default": 0
  },
  onBeforeChange: {
    type: Function
  },
  onAfterChange: {
    type: Function
  },
  onGoto: Function
};
exports["default"] = _default;