import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface QuoteType {
  color?: string;
  leftColor?: string;
}

export default defineComponent({
  name: 'lay-quote',
  props: {
    color: {
      type: String as PropType<string>,
      default: ''
    },
    leftColor: {
      type: String as PropType<string>,
      default: ''
    },
    nm: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup (props, { slots }) {
    return () => {
      const { color, leftColor, nm } = props
      let style = {}
      if (nm) {
        style = {
          borderColor: color,
          borderLeftColor: leftColor
        }
      } else {
        style = { backgroundColor: color, borderLeftColor: leftColor }
      }
      return <blockquote
        class={'layui-elem-quote ' + (nm ? 'layui-quote-nm' : '')}
        style={style}>
        {slots.default && slots.default()}
      </blockquote>
    }
  }
})
