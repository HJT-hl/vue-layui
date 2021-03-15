import { defineComponent, h, PropType, ref, Ref } from 'vue'
import { className } from '../../_utils/utils'
import { childrenAddProps } from '../../_utils/component'
import './style.less'

type modelValue = number | string;

interface TabType {
  modelValue: modelValue;
  type: string;
  closable: boolean;
  onClick?: (tabbar: { label: string, name: modelValue }) => void;
  onRemove?: (tabbar: { label: string, name: modelValue }) => void;
  briefColor: string[];
}

export default defineComponent({
  name: 'LayTab',
  props: {
    modelValue: {
      type: [String, Number] as PropType<modelValue>,
      default: ''
    },
    type: {
      type: String as PropType<string>,
      default: ''
    },
    closable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    onClick: {
      type: Function as PropType<(tabbar: { label: string, name: modelValue }) => void>
    },
    onRemove: {
      type: Function as PropType<(tabbar: { label: string, name: modelValue }) => void>
    },
    briefColor: {
      type: Array as PropType<string[]>,
      default: ['#009688', '#5FB878']
    }
  },
  setup (props: TabType, { slots, emit }) {
    const titles: Ref<{ label: string, name: modelValue }[]> = ref([])
    const closeTab: Ref<{ label: string, name: modelValue }[]> = ref([])
    return () => {
      const updateTitles = (lastTitle: string, newtitle: string, name: modelValue) => {
        if (!titles.value.find((item) => item.label === lastTitle)) titles.value.push({ label: lastTitle, name })
        else if (lastTitle !== newtitle) {
          titles.value = titles.value.map((item) => {
            if (item.label === lastTitle) return { label: newtitle, name }
            return item
          })
        }
      }
      const children = slots.default && slots.default()
      if (children) {
        childrenAddProps(children, { updateTitles, show: props.modelValue })
      }
      const handleTabClick = (tabbar: { label: string, name: modelValue }) => {
        emit('update:modelValue', tabbar.name)
        props.onClick && props.onClick(tabbar)
      }
      const displayTab = titles.value.filter((item) => !closeTab.value.find((close) => item.name === close.name))
      const handleTabClose = (e: MouseEvent, tabbar: { label: string, name: modelValue }) => {
        e.stopPropagation()

        if (tabbar.name === props.modelValue) {
          const index = displayTab.findIndex((item) => tabbar.name === item.name)
          if (displayTab[index + 1]) {
            emit('update:modelValue', displayTab[index + 1].name)
          } else if (displayTab[index - 1]) {
            emit('update:modelValue', displayTab[index - 1].name)
          } else {
            emit('update:modelValue', '')
          }
        }
        props.onRemove && props.onRemove(tabbar)
        closeTab.value.push(tabbar)
      }
      const style: any = {
        '--brief-font--': props.briefColor[0],
        '--brief-underline--': props.briefColor[1]
      }
      return <div
        style={style}
        class={className(['layui-tab', {
          'layui-tab-brief': props.type === 'brief',
          'layui-tab-card': props.type === 'card'
        }])}>
        <ul class='layui-tab-title'>
          {displayTab.map((item) => <li
            class={className({ 'layui-this': item.name === props.modelValue })}
            onClick={() => handleTabClick(item)}
          >{item.label}{props.closable &&
          <i class='layui-icon  layui-tab-close' onClick={(e) => handleTabClose(e, item)}>&#x1006;</i>}</li>)}
        </ul>
        <div class="layui-tab-content">
          {children}
        </div>
      </div>
    }
  }
})
