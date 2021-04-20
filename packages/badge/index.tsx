import { defineComponent, h, PropType } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

interface badgeType {
  type?: string;
  color?: string;
}

export default withInstall(defineComponent({
  name: 'LayBadge',
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
  setup (props: badgeType, { slots }) {
    let isSlots = true
    let className = 'layui-badge'
    const color = props.color
    const style = { backgroundColor: color, borderColor: color }
    if (props.type === 'dot') {
      isSlots = false
      className = 'layui-badge-dot'
    } else if (props.type === 'rim') {
      className = 'layui-badge-rim'
      style.backgroundColor = '#fff'
    }
    return () => {
      return <div
        class={className}
        style={style}
      >{isSlots && slots.default && slots.default()}</div>
    }
  }
}))
