import { defineComponent, h } from 'vue'
import './style.less'

export default defineComponent({
  name: 'lay-button-group',
  setup (props, { slots }) {
    return () => {
      return <div class='layui-btn-group'>{slots.default && slots.default()}</div>
    }
  }
})
