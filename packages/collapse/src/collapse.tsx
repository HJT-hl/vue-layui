import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface collapseType {
  activeIndex: string | string[];
}
type ActiveKeyType = Array<string> | string;
export default defineComponent({
  name: 'lay-collapse',
  props: {
    // @ts-ignore
    activeKey: {
      type: [Array, String] as PropType<ActiveKeyType> ,
      required: true
    }
  },
  // @ts-ignore
  setup (props: collapseType, { slots }) {
    // @ts-ignore
    console.log(props.activeIndex)
    console.log(typeof props.activeIndex)
    return () => {
      return <div class="layui-collapse">
        {slots.default && slots.default()}
      </div>
    }
  }
})
