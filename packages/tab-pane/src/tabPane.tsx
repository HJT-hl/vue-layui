import { defineComponent, h, PropType } from 'vue'

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
    return () => slots.default && slots.default()
  }
})
