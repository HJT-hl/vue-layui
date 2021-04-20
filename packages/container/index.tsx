import { defineComponent, h } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'
// TODO : 流体元素
export default withInstall(defineComponent({
  name: 'LayContainer',
  setup (props, { slots }) {
    return () => <div class="layui-container">{slots.default && slots.default()}</div>
  }
}))
