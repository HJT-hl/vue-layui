import { defineComponent, h } from 'vue'
import './style.less'

export default defineComponent({
  name: 'LayButtonGroup',
  setup (props, { slots }) {
    return () => {
      return <div class='layui-btn-group'>{slots.default && slots.default()}</div>
    }
  }
})
