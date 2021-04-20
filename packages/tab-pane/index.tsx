import { defineComponent, h, PropType } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

type name = number | string;

interface TabPaneType {
  label: string;
  name: name;
}

export default withInstall(defineComponent({
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
    return () => <div class="layui-tab-content">
      {slots.default && slots.default()}
    </div>
  }
}))
