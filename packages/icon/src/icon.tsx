import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface iconType {
  icon: string;
  size?: number;
  color?: string;
}

export default defineComponent({
  name: 'la-icon',
  props: {
    icon: {
      type: String as PropType<string>,
      required: true
    },
    size: {
      type: Number as PropType<number>,
      default: 16
    },
    color: {
      type: String as PropType<string>,
      default: '#666'
    }
  },
  setup (props: iconType) {
    const icon = `layui-icon-${props.icon}`
    return () => <i class={'layui-icon ' + icon} style={{ fontSize: props.size + 'px', color: props.color }}></i>
  }
})
