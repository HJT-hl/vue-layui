import { defineComponent, h, PropType } from 'vue'
import { className, emptyFun } from '../../_utils/utils'
import './style.less'

type name = number | string;

interface TabPaneType {
  label: string;
  name: name;
  updateTitles: (l: string, label: string, name: name) => void;
  show: name;
}

export default defineComponent({
  name: 'LayTabPane',
  props: {
    name: {
      type: [String, Number] as PropType<name>,
      required: true
    },
    label: {
      type: String as PropType<string>,
      default: ''
    },
    updateTitles: {
      type: Function as PropType<(l: string, label: string, name: name) => void>,
      default: emptyFun
    },
    show: {
      type: [String, Number] as PropType<name>,
      default: ''
    }
  },
  setup (props: TabPaneType, { slots }) {
    let lastTitle = props.label
    return () => {
      props.updateTitles(lastTitle, props.label, props.name)
      lastTitle = props.label
      return <div
        class={className(['layui-tab-item', { 'layui-show': props.show === props.name }])}>
        {slots.default && slots.default()}
      </div>
    }
  }
})
