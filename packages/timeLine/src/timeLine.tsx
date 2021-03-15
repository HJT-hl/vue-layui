import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface layTimeLineType {
  model: string;
}

export default defineComponent({
  name: 'LayTimeLine',
  props: {
    model: { type: String as PropType<string>, default: 'left' }
  },
  setup (props:layTimeLineType, { slots }) {
    return () => {
      return <div class={'layui-timeline ' + `layui-timeline-${props.model}`}>
        {slots.default && slots.default()}
      </div>
    }
  }
})
