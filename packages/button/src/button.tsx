import { defineComponent, h, PropType } from 'vue'
import './style.less'
import { emptyFun } from '../../_utils/utils'

interface buttonType {
  type?: string;
  onClick?: () => void;
  size?: string;
  fluid?: boolean;
  radius?: boolean;
}

export default defineComponent({
  name: 'lay-button',
  props: {
    type: {
      type: String as PropType<string>,
      default: ''
    },
    onClick: {
      type: Function as PropType<() => void>,
      default: emptyFun
    },
    size: {
      type: String as PropType<string>,
      default: ''
    },
    fluid: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    radius: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup (props: buttonType, { slots }) {
    return () => {
      const className = ['layui-btn ']
      className.push(`layui-btn-${props.type}`)
      className.push(`layui-btn-${props.size}`)
      props.fluid && className.push('layui-btn-fluid')
      props.radius && className.push('layui-btn-radius')
      const onClick = props.type === 'disabled' ? emptyFun : props.onClick
      return <button
        class={className.join(' ')}
        onClick={onClick}
      >
        {slots.default && slots.default()}
      </button>
    }
  }
})
