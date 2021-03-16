import { defineComponent, h, PropType } from 'vue'
import './style.less'

enum ModelEnum {left = 'left', Right = 'right', alternate='alternate'}
interface layTimeLineType {
  model: string;
}

export default defineComponent({
  name: 'LayTimeline',
  props: {
    model: { type: String as PropType<ModelEnum>, default: ModelEnum.left },
  },
  setup (props:layTimeLineType, { slots }) {
    return () => {
      return <div class={'layui-timeline ' + `layui-timeline-${props.model}`}>
        {slots.default && slots.default()}
      </div>
    }
  }
})
