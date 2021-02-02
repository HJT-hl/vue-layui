import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface QuoteType {
  backgroundColor?: string;
  leftColor?: string;
}

export default defineComponent({
  name: 'lay-quote',
  props: {
    backgroundColor: {
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
      const { backgroundColor, leftColor, nm } = props
      let style = {}
      if (nm) {
        style = {
          borderColor: backgroundColor,
          borderLeftColor: leftColor
        }
      } else {
        style = { backgroundColor, borderLeftColor: leftColor }
      }
      return <blockquote
        class={'layui-elem-quote ' + (nm ? 'layui-quote-nm' : '')}
        style={style}>
        {slots.default && slots.default()}
      </blockquote>
    }
  }
})
