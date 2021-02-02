import { defineComponent, h } from 'vue'
import './style.less'

export default defineComponent({
  name: 'lay-collapse-item',
  setup (props, { slots }) {
    return () => {
      return <div class="layui-colla-item">
        <div class="layui-colla-title">{slots.title && slots.title()}</div>
        <div class="layui-colla-content layui-show">
          {slots.content && slots.content()}
        </div>
      </div>
    }
  }
})
