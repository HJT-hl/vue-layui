import { defineComponent, h, PropType } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

interface buttonType {
  type?: string;
  onClick?: () => void;
  size?: string;
  fluid?: boolean;
  radius?: boolean;
}

export default withInstall(defineComponent({
  name: 'LayButton',
  props: {
    type: {
      type: String as PropType<string>,
      default: ''
    },
    onClick: {
      type: Function as PropType<() => void>,
      default: undefined
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
      const onClick = props.type === 'disabled'
        ? undefined
        : props.onClick
      return <button
        class={className.join(' ')}
        onClick={onClick}
      >
        {slots.default && slots.default()}
      </button>
    }
  }
}))
