import { defineComponent, h, PropType, CSSProperties } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

interface cardType {
  shadow?: string;
  bodyStyle?: string | CSSProperties
}
type bodyStyleType = string | CSSProperties;
export default withInstall(defineComponent({
  name: 'LayCard',
  props: {
    shadow: {
      type: String as PropType<string>,
      default: 'never'
    },
    // @ts-ignore
    bodyStyle: {
      type: [String, Object] as PropType<bodyStyleType>,
      default: { padding: '20px' }
    }
  },
  // @ts-ignore
  setup (props: cardType, { slots }) {
    return () => {
      let shadowClass = ''
      if (props.shadow === 'always') shadowClass = 'layui-card-always-shadow'
      else if (props.shadow === 'hover') shadowClass = 'layui-card-hover-shadow'
      return <div class={'layui-card ' + shadowClass}>
        <div class="layui-card-header">{slots.header && slots.header()}</div>
        <div class="layui-card-body" style={props.bodyStyle}>
          {slots.body && slots.body()}
        </div>
      </div>
    }
  }
}))
