import { defineComponent, h } from 'vue'
import './style.less'

export default defineComponent({
  name: 'LayButtonContainer',
  setup (props, { slots }) {
    return () => {
      return <div class='layui-btn-container'>{slots.default && slots.default()}</div>
    }
  }
})
