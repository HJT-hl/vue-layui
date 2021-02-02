import { defineComponent, h, PropType, CSSProperties } from 'vue'
import './style.less'

interface cardType {
  shadow?: string;
  bodyStyle?: string | CSSProperties
}

export default defineComponent({
  name: 'lay-card',
  props: {
    shadow: {
      type: String as PropType<string>,
      default: 'never'
    },
    // @ts-ignore
    bodyStyle: {
      type: [String as PropType<string>, Object as PropType<CSSProperties>],
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
})
