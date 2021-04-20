import { defineComponent, h, ref } from 'vue'
import propsType from './propsType'
import { withInstall } from '../_utils/component'
import './style/index'
import { arrayEqual } from '../_utils/utils'
// TODO : 滑动不流畅，tips 对不上
interface SliderType {
  modelValue: number | number[];
  step: number;
  max: number;
  min: number;
  vertical: boolean;
  tips: boolean;
  color: string;
  tipsColor: string;
  textColor: string;
  range: boolean;
  height: string;
  onChange?: (value: number | number[]) => void;
  showstep: boolean;
  disabled: boolean;
}

export default withInstall(defineComponent({
  name: 'LaySlider',
  props: propsType,
  setup (props: SliderType, { emit }) {
    const tipsValue = ref(0)
    const tipsShow = ref(false)
    return () => {
      let barWH = 0, barBL = 0
      const wrapValues = [0, 0]
      const wrapBtnsDom: any[] = []
      let wrapDom: any, tempDom: any, wrapDom2: any
      let { step, max, min, range, modelValue, color } = props
      // 间隔值不能小于 1
      if (step < 1) step = 1
      // 最大值不能小于最小值
      if (max < min) max = min + step
      // 判断是否开启双滑块
      let scaleFir: number, scaleSec: number, scale: number
      if (range) {
        modelValue = Array.isArray(modelValue) ? modelValue : [min, modelValue]
        const minValue = Math.min(modelValue[0], modelValue[1]),
          maxValue = Math.max(modelValue[0], modelValue[1])
        modelValue[0] = minValue > min ? minValue : min
        modelValue[1] = maxValue > min ? maxValue : min
        modelValue[0] = modelValue[0] > max ? max : modelValue[0]
        modelValue[1] = modelValue[1] > max ? max : modelValue[1]
        scaleFir = Math.floor((modelValue[0] - min) / (max - min) * 100)
        scaleSec = Math.floor((modelValue[1] - min) / (max - min) * 100)
        scale = scaleSec - scaleFir
        wrapValues[0] = (scaleFir ?? scale)
        wrapValues[1] = scaleSec
      } else {
        // 如果初始值是一个数组，则获取数组的最小值
        if (Array.isArray(modelValue)) {
          modelValue = Math.min(...modelValue)
        }
        // 初始值不能小于最小值且不能大于最大值
        if (modelValue < min) modelValue = min
        if (modelValue > max) modelValue = max
        scale = Math.floor((modelValue - min) / (max - min) * 100)
        wrapValues[0] = scale
      }
      barWH = scale
      // @ts-ignore
      barBL = (scaleFir ?? 0)

      let sliderWidth: number

      // 用于记录上一次值，值未变时，不触发change回调函数
      let lastValue = 0, lastValues = [0, 0]
      const stepM = 100 / ((max - min) / Math.ceil(step))
      const valueTo = (value: number) => {
        const oldLeft = value / sliderWidth * 100 / stepM
        let left = Math.round(oldLeft) * stepM
        if (value === sliderWidth) {
          left = Math.ceil(oldLeft) * stepM
        }
        return left
      }
      // 滑动改变位置函数
      const change = (index: number, offsetValue: number) => {
        if (Math.ceil(offsetValue) * stepM > 100) {
          offsetValue = Math.ceil(offsetValue) * stepM
        } else {
          offsetValue = Math.round(offsetValue) * stepM
        }
        offsetValue = offsetValue > 100 ? 100 : offsetValue
        wrapValues[index] = offsetValue
        let firLeft = valueTo(wrapDom.offsetLeft),
          secLeft = range ? valueTo(wrapDom2.offsetLeft) : 0
        tipsValue.value = offsetValue
        if (props.vertical) {
          // sliderAct.find('.' + SLIDER_TIPS).css({"bottom":offsetValue + '%', "margin-bottom":"20px"});
          firLeft = valueTo(sliderWidth - wrapDom.offsetTop - wrapDom.offsetHeight)
          secLeft = range ? valueTo(sliderWidth - wrapDom2.offsetTop - wrapDom.offsetHeight) : 0
        }
        firLeft = firLeft > 100 ? 100 : firLeft
        secLeft = secLeft > 100 ? 100 : secLeft
        barWH = Math.abs(firLeft - secLeft)
        barBL = Math.min(firLeft, secLeft)

        const selfValue = min + Math.round((max - min) * offsetValue / 100)

        // 如果开启范围选择，则返回数组值
        if (props.range) {
          const arrValue = [
            wrapValues[0],
            wrapValues[1]
          ]
          if (arrValue[0] > arrValue[1]) arrValue.reverse() // 如果前面的圆点超过了后面的圆点值，则调换顺序
          if (!arrayEqual(lastValues, arrValue)) {
            lastValues = arrValue
            emit('update:modelValue', arrValue)
            props.onChange && props.onChange(arrValue)
          }
        } else {
          if (lastValue !== selfValue) {
            emit('update:modelValue', selfValue)
            lastValue = selfValue
            props.onChange && props.onChange(selfValue)
          }
        }
      }
      const createMoveElem = (move: (e: MouseEvent) => void, up: () => void) => {
        const upCall = () => {
          up && up()
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', upCall)
          document.removeEventListener('mouseleave', upCall)
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', upCall)
        document.addEventListener('mouseleave', upCall)
      }
      const onMousedown = (index: number, e: MouseEvent) => {
        if (props.disabled) return
        sliderWidth = props.vertical ? tempDom.offsetHeight : tempDom.offsetWidth
        const dom = wrapBtnsDom[index]
        let oldleft = dom.parentNode.offsetLeft
        let oldx = e.clientX
        if (props.vertical) {
          oldleft = sliderWidth - dom.parentNode.offsetTop - wrapDom.offsetHeight
          oldx = e.clientY
        }
        const move = (e: MouseEvent) => {
          let left = oldleft + (props.vertical ? (oldx - e.clientY) : (e.clientX - oldx))
          if (left < 0) left = 0
          if (left > sliderWidth) left = sliderWidth
          const reaLeft = left / sliderWidth * 100 / stepM
          change(index, reaLeft)
          dom.classList.add('layui-slider-hover')
          tipsShow.value = true
          e.preventDefault()
        }
        const up = function () {
          dom.classList.remove('layui-slider-hover')
          tipsShow.value = false
        }
        createMoveElem(move, up)
      }

      // 渲染 step
      const stepRender = []
      if (props.showstep) {
        const number = (max - min) / step
        for (let i = 1; i < number + 1; i++) {
          const step = i * 100 / number
          if (step < 100) {
            stepRender.push(
              <div class="layui-slider-step"
                   style={{ [props.vertical ? 'bottom' : 'left']: step + '%' }}
              ></div>
            )
          }
        }
      }

      // disabled 状态
      if (props.disabled) {
        color = '#c2c2c2'
      }
      return <div
        class={'layui-slider ' + (props.vertical ? 'layui-slider-vertical ' : ' ') + (props.disabled ? 'layui-disabled' : '')}
        ref={(dom) => {
          tempDom = dom
        }}
        style={{ height: props.height }}
      >
        {props.tips && tipsShow.value &&
        <div class='layui-slider-tips'
             style={{
               [props.vertical ? 'bottom' : 'left']: tipsValue.value + '%',
               marginBottom: `${props.vertical ? '20px' : ''}`,
               backgroundColor: props.tipsColor,
               color: props.textColor
             }}
        >{min + Math.round((max - min) * tipsValue.value / 100)}</div>
        }
        <div class='layui-slider-bar'
             style={{
               backgroundColor: color,
               [props.vertical ? 'height' : 'width']: barWH + '%',
               [props.vertical ? 'bottom' : 'left']: barBL + '%'
             }}
        ></div>
        <div class='layui-slider-wrap' style={{ [props.vertical ? 'bottom' : 'left']: wrapValues[0] + '%' }}
             ref={(dom) => {
               wrapDom = dom
             }}>
          <div class={'layui-slider-wrap-btn ' + (props.disabled ? 'layui-disabled' : '')}
               style={{ border: `2px solid ${color}` }}
               ref={(dom) => {
                 wrapBtnsDom[0] = dom
               }}
               onMousedown={(e) => onMousedown(0, e)}
          ></div>
        </div>
        {
          range &&
          <div class='layui-slider-wrap' style={{ [props.vertical ? 'bottom' : 'left']: wrapValues[1] + '%' }}
               ref={(dom) => {
                 wrapDom2 = dom
               }}>
            <div class={'layui-slider-wrap-btn ' + (props.disabled ? 'layui-disabled' : '')}
                 style={{ border: `2px solid ${color}` }}
                 ref={(dom) => {
                   wrapBtnsDom[1] = dom
                 }}
                 onMousedown={(e) => onMousedown(1, e)}
            ></div>
          </div>
        }
        {stepRender}
      </div>
    }
  }
}))
