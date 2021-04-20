export default {
  data: {
    type: Array,
    "default": []
  },
  modelValue: {
    type: Array,
    "default": []
  },
  title: {
    type: Array,
    "default": ['列表一', '列表二']
  },
  width: {
    type: Number,
    "default": 200
  },
  height: {
    type: Number,
    "default": 360
  },
  showSearch: {
    type: Boolean,
    "default": false
  },
  text: {
    type: Object,
    "default": {
      none: '无数据',
      searchNone: '无匹配数据'
    }
  },
  onChange: {
    type: Function
  }
};