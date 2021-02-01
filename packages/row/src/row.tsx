import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface rowType {
  colSpace?: number;
}

export default defineComponent({
  name: 'lay-row',
  props: {
    colSpace: Number as PropType<number>
  },
  setup (props: rowType, { slots }) {
    return () => {
      let style: any = {}
      if (props.colSpace !== undefined) {
        style = {
          '--m': -1 * props.colSpace / 2 + 'px',
          '--p': props.colSpace / 2 + 'px'
        }
      }
      return <div class='layui-row space' style={style}>{slots.default && slots.default()}</div>
    }
  }
})
