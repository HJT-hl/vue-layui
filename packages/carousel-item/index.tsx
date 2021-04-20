import { defineComponent, h } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

export default withInstall(defineComponent({
  name: 'LayCarouselItem',
  setup (props, { slots }) {
    return () => {
      return <div class={'layui-carousel-item'}>{slots.default && slots.default()}</div>
    }
  }
}))
