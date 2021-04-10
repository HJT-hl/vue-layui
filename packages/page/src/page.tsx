import { defineComponent, h, onBeforeUpdate, ref, VNode, watchEffect } from 'vue'
import './style.less'
import props, { propsType } from './props'
import { className } from '../../_utils/utils'

const DISABLED = 'layui-disabled'
export default defineComponent({
  name: 'LayPage',
  props,
  // @ts-ignore
  setup (props: propsType, { slots, emit }) {
    return () => {
      let { groups, modelValue, count, theme, limit, onJump, onPrev, onNext } = props

      //数据取整
      let curr = modelValue | 0
      groups = groups | 0
      count = count | 0
      limit = limit | 0
      const pages = Math.ceil(count / limit) || 1
      //当前页不能超过总页数
      if (curr > pages) {
        curr = pages
      }
      //连续分页个数不能低于0且不能大于总页数
      if (groups < 0) {
        groups = 1
      } else if (groups > pages) {
        groups = pages
      }
      //计算当前组
      const index = pages > groups
        ? Math.ceil((curr + (groups > 1 ? 1 : 0)) / (groups > 0 ? groups : 1))
        : 1
      const pageJump = (dataPage: number) => {
        const curr = dataPage | 0
        if (curr < 1 || curr > pages) return
        onJump && onJump(curr)
        emit('update:modelValue', curr)
      }
      const pageView = (() => {
        const pager = []
        if (count < 1) return ''
        //首页
        if (index > 1 && groups !== 0) {
          pager.push(<span class="layui-laypage-first a" onClick={() => pageJump(1)}
          >{slots.first ? slots.first() : '1'}</span>)
        }

        //计算当前页码组的起始页
        let halve = Math.floor((groups - 1) / 2) //页码数等分
        let start = index > 1 ? curr - halve : 1
        const end = index > 1 ? ((() => {
          const max = curr + (groups - halve - 1)
          return max > pages ? pages : max
        })()) : groups
        //防止最后一组出现“不规定”的连续页码数
        if (end - start < groups - 1) {
          start = end - groups + 1
        }
        //输出左分割符
        if (start > 2) {
          pager.push(<span class="layui-laypage-spr">&#x2026;</span>)
        }

        //输出连续页码
        for (let i = start; i <= end; i++) {
          if (i === curr) {
            //当前页
            pager.push(<span class="layui-laypage-curr">
                <em class="layui-laypage-em" style={{ backgroundColor: theme }}></em>
                <em>{i}</em>
              </span>)
          } else {
            pager.push(<span class="a" onClick={() => {
              pageJump(i)
            }}>{i}</span>)
          }
        }
        //输出输出右分隔符 & 末页
        if (pages > groups && pages > end) {
          if (end + 1 < pages) {
            pager.push(<span class="layui-laypage-spr">&#x2026;</span>)
          }
          if (groups !== 0) {
            pager.push(<span class="layui-laypage-last a"
                             onClick={() => pageJump(pages)}> {slots.end ? slots.end() : pages}</span>)
          }

        }
        return pager
      })()

      return <div class={`layui-box layui-laypage layui-laypage-default`}>
        <span class={className(['layui-laypage-prev', 'a', {
          [DISABLED]: curr == 1
        }])}
              onClick={() => pageJump(onPrev(curr))}
        >
            {slots.prev ? slots.prev() : '上一页'}
          </span>
        {pageView}
        <span class={className(['layui-laypage-next', 'a', {
          [DISABLED]: curr == pages
        }])}
              onClick={() => pageJump(onNext(curr))}
        >{slots.next ? slots.next() : '下一页'}</span>

      </div>
    }
  }
})
