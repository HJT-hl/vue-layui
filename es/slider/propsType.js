export default {
  modelValue: {
    type: [Number, Array],
    "default": [0, 0]
  },
  step: {
    type: Number,
    "default": 1
  },
  showstep: {
    type: Boolean,
    "default": false
  },
  max: {
    type: Number,
    "default": 100
  },
  min: {
    type: Number,
    "default": 0
  },
  vertical: {
    type: Boolean,
    "default": false
  },
  tips: {
    type: Boolean,
    "default": true
  },
  color: {
    type: String,
    "default": '#009688'
  },
  tipsColor: {
    type: String,
    "default": '#000'
  },
  textColor: {
    type: String,
    "default": '#fff'
  },
  range: {
    type: Boolean,
    "default": false
  },
  height: {
    type: String,
    "default": ''
  },
  disabled: {
    type: Boolean,
    "default": false
  },
  onChange: Function
};