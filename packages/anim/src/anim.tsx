import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface animType {
  animate: string;
  trigger?: boolean;
  loop?: boolean;
}

export default defineComponent({
  name: 'lay-anim',
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
})
