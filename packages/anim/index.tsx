import { defineComponent, h, PropType } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

interface animType {
  animate: string;
  trigger?: boolean;
  loop?: boolean;
}

export default withInstall(defineComponent({
  name: 'LayAnim',
  props: {
    animate: {
      type: String as PropType<string>,
      required: true
    },
    trigger: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    loop: {
      type: Boolean as PropType<boolean>,
      default: false
    }

  },
  setup (props: animType, { slots }) {
    return () => {
      let anim = ''
      if (props.trigger) {
        anim = `layui-anim-${props.animate} `
        if (props.loop) anim += 'layui-anim-loop'
      }
      return <div class={'layui-anim ' + anim}>{slots.default && slots.default()}</div>
    }
  }
}))
