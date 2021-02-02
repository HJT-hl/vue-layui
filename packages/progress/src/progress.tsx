import { defineComponent, h, CSSProperties, PropType } from 'vue'
import './style.less'

interface ProgressType {
  value: number;
  isBig?: boolean;
  showPercent?: boolean;
  color?: string;
  textStyle?: string | CSSProperties;
}

export default defineComponent({
  name: 'lay-progress',
  props: {
    // @ts-ignore
    value: {
      type: Number as PropType<number>,
      required: true
    },
    isBig: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    showPercent: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    color: {
      type: String as PropType<string>,
      default: ''
    },
    // @ts-ignore
    textStyle: {
      type: [String as PropType<string>, Object as PropType<CSSProperties>],
      default: ''
    }
  },
  // @ts-ignore
  setup (props: ProgressType, { slots }) {
    return () => {
      const { value, isBig, showPercent, color, textStyle } = props
      const text = value * 100 + '%'
      return <div class={'layui-progress ' + (isBig && 'layui-progress-big')}>
        <div class="layui-progress-bar" style={{ width: text, backgroundColor: color }}>
          {
            showPercent ? <span class={'layui-progress-text'} style={textStyle}>{text}</span> : ''
          }
        </div>
      </div>
    }
  }
})
