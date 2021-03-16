import { defineComponent, h, PropType } from 'vue'
import './style.less'

type ValueType = string | number | string[] | number[]

interface collapseItemType {
  name: string | number;
  activeName?: ValueType;
  onCollapseItemClick?: (name: string | number) => void;
}

export default defineComponent({
  name: 'LayCollapseItem',
  props: {
    name: {
      type: [String, Number] as PropType<string | number>,
      required: true
    },
    activeName: {
      type: [Array, String, Number] as PropType<ValueType>
    },
    onCollapseItemClick: {
      type: Function as PropType<(name: string | number) => void>
    }
  },
  setup (props: collapseItemType, { slots }) {
    return () => {
      const { activeName, name, onCollapseItemClick } = props
      let isOpen = false
      if (Array.isArray(activeName)) {
        // @ts-ignore
        isOpen = activeName.includes(name)
      } else {
        isOpen = activeName === name
      }

      return <div class="layui-colla-item" onClick={() => onCollapseItemClick && onCollapseItemClick(name)}>
        <div class="layui-colla-title">
          <i class={'layui-colla-icon ' + (isOpen ? 'layui-colla-icon-open' : '')}>&#xe602;</i>
          {slots.title && slots.title()}
        </div>
        <div class={'layui-colla-content layui-show ' + (isOpen ? '' : 'layui-colla-close')}>
          {slots.content && slots.content()}
        </div>
      </div>
    }
  }
})
