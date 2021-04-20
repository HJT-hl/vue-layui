import { defineComponent, h } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

export default defineComponent({
  name: 'LayButtonGroup',
  setup (props, { slots }) {
    return () => {
      return <div class='layui-btn-group'>{slots.default && slots.default()}</div>
    }
  }
})
