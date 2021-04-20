import { defineComponent, h, PropType, ref, watchEffect } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'

interface RateType {
  modelValue?: number;
  max: number;
  readonly: boolean;
  showText: boolean;
  text: string;
  textColor: string;
  allowHalf: boolean;
  color: string;
  count: number;
  onHoverChange?: (value: number) => void;
  onChange?: (value: number) => void;
}

export default withInstall(defineComponent({
  name: 'LayRate',
  props: {
    modelValue: {
      type: Number as PropType<number>
    },
    max: {
      type: Number as PropType<number>,
      default: 5
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    showText: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    text: {
      type: String as PropType<string>,
      default: ''
    },
    textColor: {
      ype: String as PropType<string>,
      default: ''
    },
    allowHalf: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    color: {
      type: String as PropType<string>,
      default: ''
    },
    count: {
      type: Number as PropType<number>,
      default: 5
    },
    onHoverChange: Function as PropType<(value: number) => void>,
    onChange: Function as PropType<(value: number) => void>
  },
  setup (props: RateType, { slots, emit }) {
    const v = ref(props.modelValue)
    watchEffect(() => {
      v.value = props.modelValue
    })
    return () => {
      const { allowHalf, count, max, color, text, textColor, showText, readonly, onHoverChange, onChange } = props
      const mouseEnter = (index: number, e: MouseEvent) => {
        if (readonly) return
        const lastValue = v.value
        if (allowHalf) {
          v.value = (index + (e.offsetX >= 10 ? 1 : 0.5)) / count * max
        } else {
          v.value = (index + 1) / count * max
        }
        if (onHoverChange && lastValue !== v.value) onHoverChange(v.value)
      }

      const mouseLeave = () => {
        if (props.modelValue !== undefined) {
          if (allowHalf) {
            v.value = (props.modelValue / (max / count / 2) | 0) * (max / count / 2)
          } else {
            v.value = (props.modelValue / (max / count) | 0) * (max / count)
          }
          if (onHoverChange) onHoverChange(v.value)
        }
      }
      const onClick = () => {
        emit('update:modelValue', v.value)
        onChange && v.value !== undefined && onChange(v.value)
      }

      let solid = 0
      let half = 0
      if (v.value !== undefined) {
        solid = v.value / max * count | 0
        if (solid > count) solid = count
      }
      if (allowHalf && v.value !== undefined) {
        half = Math.round(v.value / max * count - solid)
        if (solid === count) half = 0
      }
      return <div class='layui-inline'>
        <ul class='layui-rate' onMouseleave={mouseLeave} onClick={onClick}>
          {
            (new Array(solid)).fill(true).map((item, index) =>
              <li class='layui-inline'
                  onMousemove={(e) => mouseEnter(index, e)}
              >
                <i class='layui-icon layui-icon-rate-solid' style={{ color }}></i>
              </li>
            )
          }
          {
            half
              ? <li class='layui-inline' onMousemove={(e) => mouseEnter(solid, e)}><i
              class='layui-icon layui-icon-rate-half' style={{ color }}></i></li>
              : ''
          }
          {
            (new Array(count - solid - half)).fill(true).map((item, index) =>
              <li class='layui-inline'
                  onMousemove={(e) => mouseEnter(solid + index + (half ? 1 : 0), e)}
              >
                <i class='layui-icon layui-icon-rate' style={{ color }}></i>
              </li>
            )

          }
        </ul>
        <span class='layui-inline' style={{ color: textColor }}> {showText ? text : ''}</span>
      </div>
    }
  }
}))
