import { defineComponent, h } from 'vue'
import './style.less'

export default defineComponent({
  name: 'LayCarouselItem',

  setup (props, { slots }) {
    return () => {
      return <div class={'layui-carousel-item'}>{slots.default && slots.default()}</div>
    }
  },


})
