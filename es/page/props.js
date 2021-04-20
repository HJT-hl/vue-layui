export default {
  modelValue: {
    type: Number
  },
  count: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    "default": 10
  },
  groups: {
    type: Number,
    "default": 5
  },
  theme: {
    type: String,
    "default": ''
  },
  onJump: {
    type: Function
  },
  onPrev: {
    type: Function,
    "default": function _default(curr) {
      return curr - 1;
    }
  },
  onNext: {
    type: Function,
    "default": function _default(curr) {
      return curr + 1;
    }
  }
};