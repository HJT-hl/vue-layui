import { defineComponent, h } from 'vue'
import './style.less'
// TODO : 流体元素
export default defineComponent({
  name: 'LayContainer',
  setup (props, { slots }) {
    return () => <div class="layui-container">{slots.default && slots.default()}</div>
  }
})
