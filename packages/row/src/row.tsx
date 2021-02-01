import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface rowType {
  colSpace?: number;
}

export default defineComponent({
  props: {
    colSpace: Number as PropType<number>
  },
  setup (props: rowType, { slots }) {
    let style: any = {}
    if (props.colSpace !== undefined) {
      style = {
        '--m': -1 * props.colSpace / 2 + 'px',
        '--p': props.colSpace / 2 + 'px'
      }
    }
    console.log(style)

    return () => <div class='layui-row space' style={style}>{slots.default && slots.default()}</div>
  }
})
