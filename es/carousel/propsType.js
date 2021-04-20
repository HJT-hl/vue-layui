export var ARROWMNUM;

(function (ARROWMNUM) {
  ARROWMNUM["HOVER"] = "hover";
  ARROWMNUM["ALWAYS"] = "always";
  ARROWMNUM["NONE"] = "none";
})(ARROWMNUM || (ARROWMNUM = {}));

export var INDICATOR;

(function (INDICATOR) {
  INDICATOR["INSIDE"] = "inside";
  INDICATOR["OUTSIDE"] = "outside";
  INDICATOR["NONE"] = "none";
})(INDICATOR || (INDICATOR = {}));

export var ANIM;

(function (ANIM) {
  ANIM["DEFAULT"] = "default";
  ANIM["UPDOWN"] = "updown";
  ANIM["FADE"] = "fade";
})(ANIM || (ANIM = {}));

export var TRIGGER;

(function (TRIGGER) {
  TRIGGER["HOVER"] = "hover";
  TRIGGER["CLICK"] = "click";
})(TRIGGER || (TRIGGER = {}));

export default {
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