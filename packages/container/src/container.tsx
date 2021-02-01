import { defineComponent, h } from 'vue'
import './style.less'

export default defineComponent((props, { slots }) => {
  return () => <div class="layui-container">{slots.default && slots.default()}</div>
})
