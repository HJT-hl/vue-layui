import { defineComponent, h } from 'vue'
import './style.less'
export default defineComponent({
  name: 'LayButtonContainer',
  setup (props, { slots }) {

    return () => {
      return <div class='layui-layer layui-layer-dialog'>

      </div>
    }
  }
})
