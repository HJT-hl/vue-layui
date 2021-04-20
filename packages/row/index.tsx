import { defineComponent, h, PropType } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

interface rowType {
  colSpace?: number;
}

export default withInstall(defineComponent({
  name: 'LayRow',
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
}))
