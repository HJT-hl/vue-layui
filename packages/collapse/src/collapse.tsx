import { defineComponent, h, PropType } from 'vue'
import './style.less'
import { childrenAddProps } from '../../_utils/component'
import { triggerElement } from '../../_utils/utils'

type ValueType = string | number | string[] | number[]

interface collapseType {
  modelValue?: ValueType;
  onChange?: (name: ValueType) => void
}

export default defineComponent({
  name: 'LayCollapse',
  props: {
    modelValue: {
      type: [Array, String, Number] as PropType<ValueType>
    },
    'onUpdate:modelValue': {
      type: Function as PropType<() => void>
    },
    onChange: {
      type: Function as PropType<(name: ValueType) => void>
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
