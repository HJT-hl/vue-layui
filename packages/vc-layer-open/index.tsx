import { App, createApp, CSSProperties } from 'vue'
import './style'
import { propsType, OffsetEnum } from './propsType'
import { className, funExe } from '../_utils/utils'

let index = 20000309
const layerOpenMap = new Map()
let zIndex = 20000309
const config: propsType = {
  title: '信息',
  content: '',
  skin: '',
  offset: 'auto',
  icon: -1,
  closeBtn: 1,
  shade: 0.3,
  scrollbar: true,
  maxWidth: 360,
  zIndex: zIndex,
  anim: 0,
  isOutAnim: true,
  time: 0,
  isMove: true
}
export default function layerOpen (options = config) {
  const id = index++
  options = { ...config, ...options }
  let thisCloseModal: any
  // 遮罩处理
  let shadeContainer: HTMLDivElement | null = null
  let shadeApp: App<Element> | null = null
  if (Array.isArray(options.shade) || (typeof options.shade === 'number' && options.shade >= 0)) {
    shadeContainer = document.createElement('div')
    document.body.appendChild(shadeContainer)
    shadeApp = createApp({
      render () {
        const style: CSSProperties = { zIndex: zIndex++ }
        if (Array.isArray(options.shade)) {
          style.opacity = options.shade[0]
          style.backgroundColor = options.shade[1]
        } else if (typeof options.shade === 'number') {
          style.opacity = options.shade
          style.backgroundColor = '#000'
        }
        return <div
          class='layui-layer-shade'
          style={style}
          onClick={() => {
            thisCloseModal()
          }}
        >
        </div>
      }
    })
    shadeApp.mount(shadeContainer)
  }

  // 弹出框处理
  const div = document.createElement('div')
  document.body.appendChild(div)
  // scrollbar 是否允许浏览器出现滚动条
  if (options.scrollbar) {
    document.body.style.overflow = 'hidden'
  }
  const app = createApp({
    data () {
      return {
        closeAnim: false,
        timer: undefined,
        style: {},
        left: 0,
        top: 0,
        moveStart: false,
        moveOffset: []
      }
    },
    watch: {
      left (newV) {
        this.style.left = newV + 'px'
      },
      top (newV) {
        this.style.top = newV + 'px'
      }
    },
    created () {
      thisCloseModal = this.closeModel
      layerOpenMap.set(id, thisCloseModal)
      this.style = {
        zIndex: zIndex++, '--translateX': 0, '--translateY': 0,
        maxWidth: options.maxWidth + 'px', maxHeight: options.maxHeight + 'px'
      }

      if (typeof options.area === 'string') {
        this.style.width = options.area
      } else if (Array.isArray(options.area)) {
        this.style.width = options.area[0]
      }
      // 设置位置
      if (typeof options.offset === 'string') {
        let clientWidthD2 = document.documentElement.clientWidth / 2
        let clientHeightD2 = document.documentElement.clientHeight / 2

        const setHorizonalCenter = () => {
          this.left = clientWidthD2
          this.style['--translateX'] = '-50%'
        }
        const setVerticalCenter = () => {
          this.top = clientHeightD2
          this.style['--translateY'] = '-50%'
        }
        switch (options.offset) {
          case OffsetEnum.AUTO:
            setHorizonalCenter()
            setVerticalCenter()
            break
          case OffsetEnum.T:
            setHorizonalCenter()
            this.top = 0
            break
          case OffsetEnum.R:
            setVerticalCenter()
            this.left = clientWidthD2 * 2
            this.style['--translateX'] = '-100%'
            break
          case OffsetEnum.B:
            setHorizonalCenter()
            this.top = clientHeightD2 * 2
            this.style['--translateY'] = '-100%'
            break
          case OffsetEnum.L:
            setVerticalCenter()
            this.left = 0
            break
          case OffsetEnum.LT:
            this.top = 0
            this.left = 0
            break
          case OffsetEnum.LB:
            this.left = 0
            this.top = clientHeightD2 * 2
            this.style['--translateY'] = '-100%'
            break
          case OffsetEnum.RT:
            this.left = clientWidthD2 * 2
            this.style['--translateX'] = '-100%'
            this.top = 0
            break
          case OffsetEnum.RB:
            this.left = clientWidthD2 * 2
            this.style['--translateX'] = '-100%'
            this.top = clientHeightD2 * 2
            this.style['--translateY'] = '-100%'
            break
          default :
            setHorizonalCenter()
            this.top = options.offset
            break
        }
      } else if (Array.isArray(options.offset)) {
        this.top = options.offset[0]
        this.left = options.offset[1]
      }
    },
    mounted () {
      if (options.time && options.time > 0) {
        this.timer = setTimeout(() => {
          this.closeModel()
        }, options.time)
      }
    },
    beforeUnmount () {
      clearTimeout(this.timer)
    },
    unmounted () {
      options.onEnd && options.onEnd()
      layerOpenMap.delete(id)
    },
    methods: {
      closeModel () {
        if (options.isOutAnim) this.closeAnim = true
        setTimeout(() => {
          app.unmount(div)
          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
          if (shadeApp && shadeContainer) {
            shadeApp.unmount(shadeContainer)
            if (shadeContainer.parentNode) {
              shadeContainer.parentNode.removeChild(shadeContainer);
            }
          }

        }, 300)
      },
      handleEvent (callback: any) {
        if (funExe(callback) !== false) {
          this.closeModel()
        }
      },
      handleMove (e: MouseEvent) {
        if (!options.isMove) return
        //拖拽移动
        if (this.moveStart) {
          e.preventDefault()
          const X = e.clientX - this.moveOffset[0]
          const Y = e.clientY - this.moveOffset[1]
          this.left = X
          this.top = Y
        }
      },
      handleMoveDown (e: MouseEvent) {
        if (!options.isMove) return
        e.preventDefault()
        this.moveStart = true
        this.moveOffset = [
          e.clientX - this.left,
          e.clientY - this.top
        ]
        document.addEventListener('mousemove', this.handleMove)
      },
      handleMoveUp (e: MouseEvent) {
        if (!options.isMove) return
        if (this.moveStart) {
          this.moveStart = false
          document.removeEventListener('mousemove', this.handleMove)
          options.onMoveEnd && options.onMoveEnd(e)
        }
      }
    },
    render () {
      // 设置图标
      let icon = -1
      if (options.icon && (options.icon | 0) >= 0 && (options.icon | 0) <= 6) {
        icon = options.icon | 0
      }
      // btn 按钮
      let callback: ((() => boolean | void) | undefined)[] = [options.onYes]

      let btns = [<i class="layui-layer-btn0" onClick={() => this.handleEvent(callback[0])}>确定</i>]
      if (Array.isArray(options.btn)) {
        if (options.callback) callback = options.callback
        // @ts-ignore
        btns = options.btn.map((item, index) => {
          if (typeof item === 'object') {
            return <i class="layui-layer-btn0" onClick={() => this.handleEvent(callback[index])}
                      style={item}>{item.title}</i>
          }
          return <i class="layui-layer-btn0" onClick={() => this.handleEvent(callback[index])}>{item}</i>
        })
      } else if (typeof options.btn === 'string') {
        // @ts-ignore
        btns = [<i class="layui-layer-btn0" onClick={() => handleEvent(callback[0])}>{options.btn}</i>]
      }
      // closeBtn 按钮
      let closeBtn = options.closeBtn
      if (closeBtn !== 1 && closeBtn !== 2) closeBtn = 0
      return <div
        class={className(['layui-layer',
          'layui-layer-dialog',
          options.skin || '',
          'layer-anim',
          'layer-anim-0' + options.anim,
          {
            'layer-anim-close': this.closeAnim
          }
        ])}
        style={this.style}>
       <div
          class="layui-layer-title"
          style={{ cursor: 'move' }}
          onMousedown={this.handleMoveDown}
          onMouseup={this.handleMoveUp}
        >{options.title}</div>
        <div
          class={className(['layui-layer-content',
            {
              'layui-layer-padding': icon !== -1,
            }])}
          style={(options.area && options.area[1] !== undefined) ? `height:${options.area[1]}` : ''}>
          {icon !== -1 && <i class={'layui-layer-ico layui-layer-ico' + icon}></i>}
          {options.content}
        </div>
         <span class="layui-layer-setwin" onClick={() => {
          if (funExe(options.onCancel) !== false) {
            this.closeModel()
          }
        }}>
          {closeBtn !== 0 && <i class={'layui-layer-ico layui-layer-close layui-layer-close' + closeBtn}></i>}
        </span>
         <div class={'layui-layer-btn'} style={{ justifyContent: options.btnAlign }}>
          {btns}
        </div>
      </div>
    }

  })
  app.mount(div)
  return id
}

export function layerClose (id: number) {
  if (id === undefined) {
    layerOpenMap.forEach((closeModel) => {
      closeModel()
    })
    layerOpenMap.clear()
  } else if (typeof layerOpenMap.get(id) === 'function') {
    layerOpenMap.get(id)()
    layerOpenMap.delete(id)
  }
}
