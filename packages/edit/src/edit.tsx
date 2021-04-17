import { defineComponent, h, onMounted, VNode } from 'vue'
import './style.less'
import propsType from './propsType'
import $, { JQuery } from '../../_utils/dom'
// TODO : 解决引入其他文件问题
const CHECK = 'layedit-tool-active', ABLED = 'layui-disabled'
//Range对象兼容性处理
const Range = (iframeDOM: any) => {
  return iframeDOM.selection
    ? iframeDOM.selection.createRange()
    : iframeDOM.getSelection().getRangeAt(0)
}
//当前Range对象的endContainer兼容性处理
const getContainer = (range: any) => {
  return range.endContainer || range.parentElement().childNodes[0]
}
export default defineComponent({
  name: 'LayEdit',
  props: propsType,
  data () {
    return {}
  },
  render () {

    const { tool, hideTool, height, name } = this.$props
    let toolsDom: any
    const displayTools = (() => {
      const node: any = [], ht: Record<string, boolean> = {}
      hideTool.forEach(item => {
        ht[item] = true
      })
      tool.forEach(item => {
        if (this.tools[item] && !ht[item]) {
          node.push(this.tools[item])
        }
      })
      return node
    })()
    const filter = (body: JQuery) => {
      body.find('*[style]').each((item: Element) => {
        // @ts-ignore
        const textAlign = item.style.textAlign
        item.removeAttribute('style')
        // @ts-ignore
        item.style.textAlign = textAlign || ''
        //修饰表格
        body.find('table').addClass('layui-table')
        //移除不安全的标签
        body.find('script').remove()
        body.find('link').remove()
      })
    }
    const hotkey = (iframeWin: any) => {
      const iframeDOM = iframeWin.document

      if (this.body) {
        this.body.on('keydown', (e: KeyboardEvent) => {
          const keycode = e.keyCode
          //处理回车
          if (keycode === 13) {
            const range = Range(iframeDOM)
            const container = getContainer(range)
              , parentNode = container.parentNode

            if (parentNode.tagName.toLowerCase() === 'pre') {
              if (e.shiftKey) return
              alert('请暂时用shift+enter')
              return false
            }
            iframeWin.execCommand('formatblock', false, '<p>')
          }
        })
        this.content = this.body.html()
        //处理粘贴
        this.body.on('paste', () => {
          iframeDOM.execCommand('formatBlock', false, '<p>')
          setTimeout(() => {
            filter(this.body)
            this.content = this.body.html()
          }, 100)
        })
      }

    }
    const click = (othis: JQuery) => {
      const iframeDOM = this.myWindw.document
      const events = othis.getAttr('layedit-event')
      const command = othis.getAttr('lay-command')
      if (othis.hasClass('layui-disabled')) return
      this.body.focus()
      if (command) {
        iframeDOM.execCommand(command)
        if (/justifyLeft|justifyCenter|justifyRight/.test(command)) {
          iframeDOM.execCommand('formatblock', false, '<p>')
        }
        setTimeout(() => {
          this.body.focus()
        }, 10)
      } else {
        this.toolEvent[events] && this.toolEvent[events](Range(iframeDOM))
      }
      // @ts-ignore
      toolCheck($(toolsDom))
    }
    const handleTools = (e: Event) => {
      // @ts-ignore
      const othis = $(e.target)
      if (othis) {
        const events = othis.getAttr('layedit-event')
        if (/image/.test(events)) return
        click(othis)
      }
    }
    const toolCheck = (tools: JQuery) => {
      const iframeDOM = this.myWindw
      const container = getContainer(Range(iframeDOM))
      const item: any = (type: string) => {
        return tools.find('.layedit-tool-' + type)
      }
      tools.find('i').removeClass(CHECK)
      item('unlink').addClass(ABLED)
      // @ts-ignore
      const parent = $(container)?.parent().getElem()
      const tagName = parent.tagName.toLowerCase()
      const textAlign = parent.style.textAlign
      // //文字
      if (tagName === 'b' || tagName === 'strong') {
        item('b').addClass(CHECK)
      }
      if (tagName === 'i' || tagName === 'em') {
        item('i').addClass(CHECK)
      }
      if (tagName === 'u') {
        item('u').addClass(CHECK)
      }
      if (tagName === 'strike') {
        item('d').addClass(CHECK)
      }

      //对齐
      if (tagName === 'p') {
        if (textAlign === 'center') {
          item('center').addClass(CHECK)
        } else if (textAlign === 'right') {
          item('right').addClass(CHECK)
        } else {
          item('left').addClass(CHECK)
        }
      }
      // 超链接
      if (tagName === 'a') {
        item('link').addClass(CHECK)
        item('unlink').removeClass(ABLED)
      }
    }


    return <div class="layui-layedit">
      <div class="layui-unselect layui-layedit-tool"
           ref={(dom) => {
             toolsDom = dom
           }}
           onClick={handleTools}>{displayTools}</div>
      <div class="layui-layedit-iframe" style={{ height: height + 'px' }}>
        <iframe frameborder="0"
                name={'layui-iframe-' + name}
                style={{ height: height + 'px', width: '100%' }}
                ref={(dom) => {
                  // @ts-ignore
                  dom && dom.addEventListener('load', () => {
                    // @ts-ignore
                    this.myWindw = frames['layui-iframe-' + name]
                    // @ts-ignore
                    const head = this.myWindw.document.querySelector('head')
                    head.innerHTML += ['<style>'
                      , '*{margin: 0; padding: 0;}'
                      , 'body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}'
                      , 'a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}'
                      , 'p{margin-bottom: 10px;}'
                      , 'img{display: inline-block; border: none; vertical-align: middle;}'
                      , 'pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}'
                      , '</style>'].join('')
                    this.body = $(this.myWindw.document.body)
                    this.body.setAttr('contenteditable', true).setCss({
                      minHeight: height
                    }).html('')
                    hotkey(this.myWindw)
                    this.body.on('click', () => {
                      // @ts-ignore
                      toolCheck($(toolsDom))
                    })

                  })
                }}
        ></iframe>

      </div>
    </div>
  },
  setup (props: any) {
    let content: string = ''
    let myWindw: any, body: any
    const iframeDOM = myWindw.document
    const toolEvent: any = {
      //超链接
      link: (range:Element) => {

      },
      //清除超链接
      unlink: (range:Element) => {
        iframeDOM.execCommand('unlink')
      }
    }


    const tools: Record<string, unknown> = {
      html: [<i class="layui-icon layedit-tool-html" title="HTML源代码" lay-command="html"
                layedit-event="html">&#xe64b;</i>, <span class="layedit-tool-mid"></span>],
      strong: <i class="layui-icon layedit-tool-b" title="加粗" lay-command="Bold" layedit-event="b">&#xe62b;</i>,
      italic: <i class="layui-icon layedit-tool-i" title="斜体" lay-command="italic" layedit-event="i">&#xe644;</i>,
      underline: <i class="layui-icon layedit-tool-u" title="下划线" lay-command="underline"
                    layedit-event="u">&#xe646;</i>,
      del: <i class="layui-icon layedit-tool-d" title="删除线" lay-command="strikeThrough" layedit-event="d">&#xe64f;</i>,
      '|': <span class="layedit-tool-mid"></span>,
      left: <i class="layui-icon layedit-tool-left" title="左对齐" lay-command="justifyLeft"
               layedit-event="lefe">&#xe649;</i>,
      center: <i class="layui-icon layedit-tool-center" title="居中对齐" lay-command="justifyCenter"
                 layedit-event="center">&#xe647;</i>,
      right: <i class="layui-icon layedit-tool-right" title="右对齐" lay-command="justifyRight"
                layedit-event="right">&#xe648;</i>,
      link: <i class="layui-icon layedit-tool-link" title="插入链接" layedit-event="link">&#xe64c;</i>,
      unlink: <i class="layui-icon layedit-tool-unlink layui-disabled" title="清除链接" lay-command="unlink"
                 layedit-event="unlink">&#xe64d;</i>,
      face: <i class="layui-icon layedit-tool-face" title="表情" layedit-event="face">&#xe650;</i>,
      image: <i class="layui-icon layedit-tool-image" title="图片" layedit-event="image">&#xe64a;</i>,
      code: <i class="layui-icon layedit-tool-code" title="插入代码" layedit-event="code">&#xe64e;</i>,
      help: <i class="layui-icon layedit-tool-help" title="帮助" layedit-event="help">&#xe607;</i>
    }
    return {
      content,
      myWindw,
      tools,
      body,
      toolEvent
    }
  }
})
