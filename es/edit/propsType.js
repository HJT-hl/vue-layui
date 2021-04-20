export default {
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