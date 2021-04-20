import { defineComponent, h, PropType } from 'vue'
import { toLine } from '../_utils/utils'
import { withInstall } from '../_utils/component'
import './style/index'

interface ColType {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xsOffset?: number;
  smOffset?: number;
  mdOffset?: number;
  lgOffset?: number;
}

export default defineComponent({
  name: 'LayCol',
  props: {
    xs: Number as PropType<number>,
    sm: Number as PropType<number>,
    md: Number as PropType<number>,
    lg: Number as PropType<number>,
    xsOffset: Number as PropType<number>,
    smOffset: Number as PropType<number>,
    lgOffset: Number as PropType<number>,
    mdOffset: Number as PropType<number>
  },
  setup (props: ColType, { slots }) {
    const screenMedia = ['xs', 'sm', 'md', 'lg']
    const offsets = ['xsOffset', 'smOffset', 'mdOffset', 'lgOffset']
    return () => {
      const className: string[] = ['layui-col']
      screenMedia.forEach((item) => {
        // @ts-ignore
        if (props[item] !== undefined) {
          // @ts-ignore
          className.push(`layui-col-${item}${props[item]}`)
        }
      })
      offsets.forEach((item) => {
        // @ts-ignore
        if (props[item] !== undefined) {
          const offsetName = toLine(item)
          // @ts-ignore
          className.push(`layui-col-${offsetName}${props[item]}`)
        }
      })
      return <div class={className.join(' ')}>{slots.default && slots.default()}</div>
    }
  }
})
