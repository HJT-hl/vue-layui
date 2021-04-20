import { defineComponent, h, onBeforeUpdate, onMounted, onUnmounted, PropType, ref } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'
import $ from '../_utils/dom'

interface FlowType {
  onDone: (page: number, next: (conditions: boolean) => void) => void;
  mb: number;
  scrollElemId: string;
  isAuto: boolean;
  height?: number | string;
}

export default withInstall(defineComponent({
  name: 'LayFlow',
  props: {
    isAuto: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    mb: {
      type: Number as PropType<number>,
      default: 50
    },
    onDone: {
      type: Function as PropType<(page: number, next: (conditions: boolean) => void) => void>,
      required: true
    },
    scrollElemId: {
      type: String as PropType<string>,
      default: ''
    },
    height: [Number, String] as PropType<number | string>
  },
  setup (props: FlowType, { slots }) {
    const { scrollElemId, mb, isAuto, height } = props
    let timer: number | undefined, selfDom: any
    let page = 0
    const lock = ref(false)
    const isOver = ref(false)
    const next = (conditions: boolean) => {
      isOver.value = conditions
      lock.value = false
    }
    const done = () => {
      lock.value = true
      props.onDone(++page, next)
    }
    onUnmounted(() => {
      if (timer) clearTimeout(timer)
    })
    onMounted(() => {
      done()
    })
    onBeforeUpdate(() => {
      let scrollDom = scrollElemId && $('#' + scrollElemId)
      if (height) {
        scrollDom = $(selfDom)
      }
      const handleScroll = () => {
        if (!isOver.value || !isAuto) return // 如果已经结束，或者元素处于隐藏状态，则不执行滚动加载
        let top = 0, height = 0, scrollHeight = 0
        if (scrollDom) {
          top = scrollDom.scrollTop()
          height = scrollDom.height()
          scrollHeight = scrollDom.scrollHeight()
        } else {
          top = document.documentElement.scrollTop
          height = window.innerHeight
          scrollHeight = document.documentElement.scrollHeight
        }
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          if (scrollHeight - top - height <= mb) {
            lock.value || done()
          }
        }, 100)
      }
      if (scrollDom) {
        scrollDom.on('scroll', handleScroll)
      } else {
        document.addEventListener('scroll', handleScroll)
      }
      handleScroll()
    })
    const endRender = slots.end ? slots.end() : <span>没有更多了</span>
    const loadingRender = slots.loading
      ? slots.loading()
      : <b><i class="layui-flow-loadin-icon layui-icon">&#xe63e;</i></b>
    const notAutoRender = slots.notAuto ? slots.notAuto() : <span class="layui-loading-more">加载更多</span>
    return () => {
      return <div class={height && 'layui-flow'} ref={(dom) => {
        selfDom = dom
      }} style={{ height: typeof height === 'number' ? height + 'px' : height }}>
        {slots.default && slots.default()}
        {
          <div class="layui-flow-more">
            {
              lock.value
                ? loadingRender
                : isOver.value
                  ? <span onClick={() => done()} style={{ cursor: 'pointer' }}>{notAutoRender}</span>
                  : endRender
            }
          </div>
        }
      </div>
    }
  }

}))
