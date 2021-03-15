import { defineComponent, h, PropType, ref, Ref, Fragment, VNode } from 'vue'
import { className } from '../../_utils/utils'
import { getChildren } from '../../_utils/component'
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
    const closeTab: Ref<{ label: string, name: modelValue }[]> = ref([])
    return () => {
      const children: any = slots.default && slots.default()
      const c: any[] = getChildren(children, 'LayTabPane')
      const handleTabClick = (tabbar: { label: string, name: modelValue }) => {
        emit('update:modelValue', tabbar.name)
        props.onClick && props.onClick(tabbar)
      }
      const displayTab = c.filter(({ props: p }) => {
        return !closeTab.value.find((close) => p.name === close.name)
      })
      const handleTabClose = (e: MouseEvent, tabbar: { label: string, name: modelValue }) => {
        e.stopPropagation()

        if (tabbar.name === props.modelValue) {
          const index = displayTab.findIndex(({ props: p }) => tabbar.name === p.name)
          if (displayTab[index + 1]) {
            emit('update:modelValue', displayTab[index + 1].props.name)
          } else if (displayTab[index - 1]) {
            emit('update:modelValue', displayTab[index - 1].props.name)
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
      // @ts-ignore
      return <div
        style={style}
        class={className(['layui-tab', {
          'layui-tab-brief': props.type === 'brief',
          'layui-tab-card': props.type === 'card'
        }])}>
        <ul class='layui-tab-title'>
          {displayTab.map(({ props: p }) => <li
            class={className({ 'layui-this': p.name === props.modelValue })}
            onClick={() => handleTabClick(p)}
          >{p.label}{props.closable &&
          <i class='layui-icon  layui-tab-close' onClick={(e) => handleTabClose(e, p)}>&#x1006;</i>}</li>)}
        </ul>
        <div class="layui-tab-content">
          {displayTab.find(({ props: p }) => p.name === props.modelValue)}
        </div>
      </div>
    }
  }
})
