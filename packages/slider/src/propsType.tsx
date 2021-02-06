import { PropType } from 'vue'

type modelValueType = number | number[];
export default {
  modelValue: {
    type: [Number, Array] as PropType<modelValueType>,
    default: [0, 0]
  },
  step: {
    type: Number as PropType<number>,
    default: 1
  },
  showstep:{
    type: Boolean as PropType<boolean>,
    default: false
  },
  max: {
    type: Number as PropType<number>,
    default: 100
  },
  min: {
    type: Number as PropType<number>,
    default: 0
  },
  vertical: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  tips: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  color: {
    type: String as PropType<string>,
    default: '#009688'
  },
  tipsColor: {
    type: String as PropType<string>,
    default: '#000'
  },
  textColor:{
    type: String as PropType<string>,
    default: '#fff'
  },
  range: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  height: {
    type: String as PropType<string>,
    default: ''
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  onChange: Function as PropType<(value: number | number[]) => void>
}
