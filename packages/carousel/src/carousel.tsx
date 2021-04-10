import { defineComponent, h, CSSProperties, onUnmounted, onMounted } from 'vue'
import './style.less'
import propsType, {
  TRIGGER
} from './propsType'
import { getChildren } from '../../_utils/component'

const ELEM_LEFT = 'layui-carousel-left', ELEM_RIGHT = 'layui-carousel-right',
  ELEM_PREV = 'layui-carousel-prev', ELEM_NEXT = 'layui-carousel-next', THIS = 'layui-this'
const ELEM_IND = 'layui-carousel-ind', ELEM_ARROW = 'layui-carousel-arrow'
export default defineComponent({
  name: 'LayCarousel',
  props: propsType,
  render(){

      let {
        index,
        interval,
        full,
        width,
        height,
        anim,
        indicator,
        trigger,
        arrow,
        autoplay,
        onAfterChange,
        onBeforeChange
      } = this.$props
      if (this.$slots.default === undefined) return null
      let carouselDom: any, indicatorDom: any

      const childrenLen = getChildren(this.$slots.default(), 'LayCarouselItem').length
      if (childrenLen <= 1) return


      if (index < 0) index = 0
      if (index >= childrenLen) index = childrenLen - 1
      if (interval < 800) interval = 800
      let carouselFullStyle: CSSProperties = {}
      //是否全屏模式
      if (full) {
        carouselFullStyle = {
          position: 'fixed', width: '100%', height: '100%', zIndex: 9999
        }
      } else {
        if (typeof width === 'number') width = width + 'px'
        if (typeof height === 'number') height = height + 'px'
        carouselFullStyle = { width: width, height: height }
      }

      //指示器等动作
      const handleEvent = (i: number) => {
        return {
          [trigger === TRIGGER.HOVER ? 'onMouseover' : 'onClick'] () {
            if (i > index) {
              onBeforeChange && onBeforeChange(index,i)
              slide('add', i - index)
            } else if (i < index) {
              onBeforeChange && onBeforeChange(i,index)
              slide('sub', index - i)
            }
          }
        }
      }
      let haveSlide = false

      //索引递增
      const addIndex = (num: number) => {
        num = num || 1
        index = index + num

        //index不能超过轮播总数量
        if (index >= childrenLen) {
          index = 0
        }
      }
      //索引递减
      const subIndex = function (num: number) {
        num = num || 1
        index = index - num
        //index不能超过轮播总数量
        if (index < 0) {
          index = childrenLen - 1
        }
      }
      //滑动切换
      const slide = (type: string, num: number) => {
        if(! carouselDom || haveSlide) return
        const carouselItem =  carouselDom.querySelectorAll('.layui-carousel-item')

        const thisIndex = index
        //滑动方向
        if (type === 'sub') {
          subIndex(num)
          carouselItem[index].classList.add(ELEM_PREV)
          setTimeout(function () {
            carouselItem[index].classList.add(ELEM_RIGHT)
            carouselItem[thisIndex].classList.add(ELEM_RIGHT)
          }, 50)
        } else {
          addIndex(num)
          carouselItem[index].classList.add(ELEM_NEXT)
          setTimeout(function () {
            carouselItem[index].classList.add(ELEM_LEFT)
            carouselItem[thisIndex].classList.add(ELEM_LEFT)
          }, 50)

        }
        //移除过度类
        setTimeout(function () {
          carouselItem.forEach((item: HTMLElement) => {
            item.classList.remove(THIS)
            item.classList.remove(ELEM_PREV)
            item.classList.remove(ELEM_NEXT)
            item.classList.remove(ELEM_LEFT)
            item.classList.remove(ELEM_RIGHT)
          })
          carouselItem[index].classList.add(THIS)
          haveSlide = false //解锁
          onAfterChange && onAfterChange(index)
        }, 300)
        indicatorDom && indicatorDom.querySelectorAll(`.${ELEM_IND} li`).forEach((item: HTMLElement, i: number) => {
          if (i === index) item.classList.add(THIS)
          else item.classList.remove(THIS)
        })
        haveSlide = true
      }

      //自动轮播
      const autoplayFun = () => {

        if (!autoplay) return
        clearInterval(this.timer)
        // @ts-ignore
        this.timer = setInterval(function () {
          onBeforeChange && onBeforeChange(index,index + 1)
          slide('add', 1)
        }, interval)
      }
      autoplayFun();
      this.goto = (i)=>{
        if (i > index) {
          onBeforeChange && onBeforeChange(index,i)
          slide('add', i - index)
        } else if (i < index) {
          onBeforeChange && onBeforeChange(i,index)
          slide('sub', index - i)
        }
      }
      this.next = ()=>{
        onBeforeChange && onBeforeChange(index,index + 1)
        slide('add', 1)
      }
      this.prev = ()=>{
        onBeforeChange && onBeforeChange(index,index - 1)
        slide('sub', 1)
      }

      return <div class='layui-carousel' style={carouselFullStyle}
                  lay-anim={anim}
                  lay-indicator={indicator}
                  lay-arrow={arrow}
                  onMouseenter={() => clearInterval(this.timer)}
                  onMouseleave={() => autoplayFun()}
      >
        <div carousel-item="" ref={(dom) => {
          carouselDom = dom
          if(carouselDom) carouselDom.querySelectorAll('.layui-carousel-item')[index].classList.add(THIS)
        }}>
          {this.$slots.default()}
        </div>
        <div class={ELEM_IND} ref={(dom) => {
          indicatorDom = dom
        }}>
          <ul>
            {
              (() => {
                const indics = []
                for (let i = 0; i < childrenLen; i++) {
                  indics.push(<li class={index === i ? THIS : ''}  {...handleEvent(i)}></li>)
                }
                return indics
              })()
            }
          </ul>

        </div>
        <button class={`layui-icon  ${ELEM_ARROW}`} lay-type="sub"
                onClick={() => {
                  onBeforeChange && onBeforeChange(index,index - 1)
                  slide('sub', 1)
                }}> {anim === 'updown' ? <span>&#xe619;</span> : <span>&#xe603;</span>}
        </button>
        <button class={`layui-icon ${ELEM_ARROW}`} lay-type="add"
                onClick={() => {
                  onBeforeChange && onBeforeChange(index,index + 1)
                  slide('add', 1)
                }}> {anim === 'updown' ? <span>&#xe61a;</span> :
          <span>&#xe602;</span>} </button>
      </div>
  },
  onUnmounted(){
    clearInterval(this.timer)
  },
  setup(){
    let goto = (index:number)=>{};
    let next = ()=>{};
    let prev = ()=>{};
    let timer = undefined
    return {
      goto,
      next,
      prev,
      timer
    }
  }
})
