import { defineComponent, h, CSSProperties, PropType } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

interface ProgressType {
  value: number;
  isBig?: boolean;
  showPercent?: boolean;
  color?: string;
  textStyle?: string | CSSProperties;
}

type textStyleType = string | CSSProperties
export default withInstall(defineComponent({
  name: 'LayProgress',
  props: {
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
    textStyle: {
      type: [String, Object] as PropType<textStyleType>,
      default: ''
    }
  },
  setup (props: ProgressType, { slots }) {
    return () => {
      const { value, isBig, showPercent, color, textStyle } = props
      const text = value * 100 + '%'
      return <div class={'layui-progress ' + (isBig ? 'layui-progress-big' : '')}>
        <div class="layui-progress-bar" style={{ width: text, backgroundColor: color }}>
          {
            showPercent ? <span class={'layui-progress-text'} style={textStyle}>{text}</span> : ''
          }
        </div>
      </div>
    }
  }
}))
