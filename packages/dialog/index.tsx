import { defineComponent, h } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

export default withInstall(defineComponent({
  name: 'LayButtonContainer',
  setup (props, { slots }) {
    return () => {
      return <div class='layui-layer layui-layer-dialog'>

      </div>
    }
  }
}))
