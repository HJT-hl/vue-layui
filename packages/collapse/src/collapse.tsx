import { defineComponent, h, PropType } from 'vue'
import './style.less'
import { childrenAddProps } from '../../_utils/component'
import { triggerElement } from '../../_utils/utils'

interface collapseType {
  modelValue?: string | string[];
  onChange?: (name: string | string[]) => void
}

type ActiveKeyType = Array<string> | string;
export default defineComponent({
  name: 'lay-collapse',
  props: {
    modelValue: {
      type: [Array, String] as PropType<ActiveKeyType>
    },
    'onUpdate:modelValue': {
      type: Function as PropType<() => void>
    },
    onChange: {
      type: Function as PropType<(name: string | string[]) => void>
    }
  },
  setup (props: collapseType, { slots, emit }) {
    return () => {
      const collapseItemClick = (name: string) => {
        let newName: string | string[]
        if (Array.isArray(props.modelValue)) {
          newName = triggerElement(props.modelValue, name)
          // proxy to array
          props.onChange && props.onChange([...newName])
        } else {
          if (props.modelValue === name) newName = ''
          else newName = name
          props.onChange && props.onChange(newName)
        }
        emit('update:modelValue', newName)
      }

      let children = slots.default && slots.default()
      if (children) {
        children = childrenAddProps(children, {
          onCollapseItemClick: collapseItemClick,
          activeName: props.modelValue
        })
      }
      return <div class="layui-collapse">
        {children}
      </div>
    }
  }
})
