import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface fieldType {
  isRow?: boolean;
  marginLeft?: number | string;
}

type marginLeftType = number | string
export default defineComponent({
  name: 'lay-field',
  props: {
    isRow: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    marginLeft: {
      type: [Number, String] as PropType<marginLeftType>,
      default: 20
    }
  },
  setup (props: fieldType, { slots }) {
    return () => {
      let marginLeft = ''
      if (typeof props.marginLeft === 'number') {
        marginLeft = props.marginLeft + 'px'
      } else if (typeof props.marginLeft === 'string') {
        marginLeft = props.marginLeft
      }
      return <fieldset class={'layui-elem-field ' + (props.isRow ? 'layui-field-title' : '')}>
        <legend style={{ marginLeft }}>{slots.title && slots.title()}</legend>
        <div class="layui-field-box">
          {slots.content && slots.content()}
        </div>
      </fieldset>
    }
  }
})
