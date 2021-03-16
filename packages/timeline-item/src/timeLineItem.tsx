import { defineComponent, h, CSSProperties, PropType } from 'vue'
import './style.less'

type titleStyle = string | CSSProperties;

interface layTimeLineItemType {
  title: string;
  titleStyle?: titleStyle;
  iconColor: string;
  lineColor: string;
}

export default defineComponent({
  name: 'LayTimelineItem',
  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },
    titleStyle: {
      type: [String, Object] as PropType<titleStyle>,
      default: ''
    },
    iconColor: {
      type: String as PropType<string>,
      default: ''
    },
    lineColor: {
      type: String as PropType<string>,
      default: '#e6e6e6'
    }
  },
  setup (props: layTimeLineItemType, { slots }) {
    return () => {
      const style: any = { '--line-color': props.lineColor }
      return <div class="layui-timeline-item" style={style}>
        <div class='layui-timeline-axis' style={{ color: props.iconColor }}>
          {
            slots.icon
              ? slots.icon()
              : <i class="layui-icon" style={{ height: '20px', width: '20px' }}>&#xe63f;</i>
          }
        </div>
        <div class="layui-timeline-content layui-text">
          <div class="layui-timeline-title" style={props.titleStyle}>{props.title}</div>
          {slots.default && slots.default()}
        </div>
      </div>
    }
  }
})
