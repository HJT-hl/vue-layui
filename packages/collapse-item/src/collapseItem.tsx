import { defineComponent, h, PropType } from 'vue'
import './style.less'

interface collapseItemType {
  name: string;
  activeName?: string | Array<string>;
  onCollapseItemClick?: (name: string) => void;
}

type ActiveKeyType = Array<string> | string;
export default defineComponent({
  name: 'LayCollapseItem',
  props: {
    name: {
      type: String as PropType<string>,
      required: true
    },
    activeName: {
      type: [Array, String] as PropType<ActiveKeyType>
    },
    onCollapseItemClick: {
      type: Function as PropType<(name: string) => void>
    }
  },
  setup (props: collapseItemType, { slots }) {
    return () => {
      const { activeName, name, onCollapseItemClick } = props
      let isOpen = false
      if (Array.isArray(activeName)) {
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
