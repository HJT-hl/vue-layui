"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: {
    type: String,
    "default": true
  },
  tool: {
    type: Array,
    "default": ['strong', 'italic', 'underline', 'del', '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'face', 'image']
  },
  hideTool: {
    type: Array,
    "default": []
  },
  height: {
    type: Number,
    "default": 200
  }
};
exports["default"] = _default;