import { PropType } from 'vue'

export interface propsType {
  modelValue: number;
  count: number;
  mode: number;
  limit: number;
  groups: number;
  theme: string;
  onJump?: (curr: number) => void;
  onPrev: (curr: number) => number;
  onNext: (curr: number) => number;
}

export default {
  modelValue: {
    type: Number as PropType<number>
  },
  count: {
    type: Number as PropType<number>,
    required: true
  },
  limit: {
    type: Number as PropType<number>,
    default: 10
  },
  groups: {
    type: Number as PropType<number>,
    default: 5
  },
  theme: {
    type: String as PropType<string>,
    default: ''
  },
  onJump: {
    type: Function as PropType<(curr: number) => void>
  },
  onPrev: {
    type: Function as PropType<(curr: number) => number>,
    default: (curr: number):number => {
      return curr - 1
    }
  },
  onNext: {
    type: Function as PropType<(curr: number) => number>,
    default: (curr: number):number => {
      return curr + 1
    }
  }
}
