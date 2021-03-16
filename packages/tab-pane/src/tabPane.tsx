import { defineComponent, h, PropType } from 'vue'
import './style.less'
type name = number | string;

interface TabPaneType {
  label: string;
  name: name;
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
    }
  },
  setup (props: TabPaneType, { slots }) {
    return () =>  <div class="layui-tab-content">
      { slots.default && slots.default()}
    </div>
  }
})
