import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface badgeType {
  type?: string;
  color?: string;
}

export default defineComponent({
  name: 'lay-badge',
  props: {
    type: {
      type: String as PropType<string>,
      default: ''
    },
    color: {
      type: String as PropType<string>,
      default: '#FF5722'
    }
  },
  setup (props, { slots }) {
    let isSlots = true
    let className = 'layui-badge'
    let color = props.color
    if (props.type === 'dot') {
      isSlots = false
      className = 'layui-badge-dot'
    } else if (props.type === 'rim') {
      className = 'layui-badge-rim'
      color = '#fff'
    }
    return () => {
      return <div
        class={className}
        style={{ backgroundColor: color }}
      >{isSlots && slots.default && slots.default()}</div>
    }
  }
})
