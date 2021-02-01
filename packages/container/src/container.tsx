import { defineComponent, h } from 'vue'
import './style.less'

export default defineComponent({
  name: 'lay-container',
  setup (props, { slots }) {
    return () => <div class="layui-container">{slots.default && slots.default()}</div>
  }
})
