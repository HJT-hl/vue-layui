"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ErrorStatus = void 0;
var ErrorStatus;
exports.ErrorStatus = ErrorStatus;

(function (ErrorStatus) {
  ErrorStatus[ErrorStatus["extsError"] = 0] = "extsError";
  ErrorStatus[ErrorStatus["sizeError"] = 1] = "sizeError";
  ErrorStatus[ErrorStatus["numberError"] = 2] = "numberError";
  ErrorStatus[ErrorStatus["requestError"] = 3] = "requestError";
})(ErrorStatus || (exports.ErrorStatus = ErrorStatus = {}));

var _default = {
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
exports["default"] = _default;