import { defineComponent, h, PropType } from 'vue'
import './style.less'

enum ModelEnum {LEFT = 'left', RIGHT = 'right', ALTERNATE='alternate'}
interface layTimeLineType {
  model: ModelEnum;
}

export default defineComponent({
  name: 'LayTimeline',
  props: {
    model: { type: String as PropType<ModelEnum>, default: ModelEnum.LEFT },
  },
  setup (props:layTimeLineType, { slots }) {
    return () => {
      let model = props.model;
      // @ts-ignore
      if((model !== ModelEnum.RIGHT) || (model !== ModelEnum.ALTERNATE)){
        model = ModelEnum.LEFT;
      }
      return <div class={'layui-timeline ' + `layui-timeline-${model}`}>
        {slots.default && slots.default()}
      </div>
    }
  }
})
