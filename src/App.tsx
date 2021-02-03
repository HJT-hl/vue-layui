import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Timeline from '../packages/timeLine/index'
import TimelineItem from '../packages/timeLineItem/index'
import Icon from '../packages/icon/index'

export default defineComponent({
  setup () {
    const onClick = (name: string|string[]) => {
      console.log(name)
    }
    const a = ref('1')
    return () => <Container>
      <Timeline model={'left'}>
        <TimelineItem title={'1月18日'}>
          layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。
          不枉近百个日日夜夜与之为伴。因小而大，因弱而强。
          无论它能走多远，抑或如何支撑？至少我曾倾注全心，无怨无悔
        </TimelineItem>
        <TimelineItem title={'1月18日'} v-slots={{icon : ()=><Icon icon={'heart'} size={50}/>}}>
          杜甫的思想核心是儒家的仁政思想，他有“致君尧舜上，再使风俗淳”的宏伟抱负。个人最爱的名篇有：
          《登高》
          《茅屋为秋风所破歌》
        </TimelineItem>
        <TimelineItem title={'1月18日'} titleStyle={{fontSize : '20px'}}>
          中国人民抗日战争胜利日
          常常在想，尽管对这个国家有这样那样的抱怨，但我们可能的确生在了最好的时代
          铭记、感恩
          所有为中华民族浴血奋战的英雄将士
          永垂不朽
        </TimelineItem>
        <TimelineItem title={'1月18日'} iconColor={'red'} >
          中国人民抗日战争胜利日
          常常在想，尽管对这个国家有这样那样的抱怨，但我们可能的确生在了最好的时代
          铭记、感恩
          所有为中华民族浴血奋战的英雄将士
          永垂不朽
        </TimelineItem>
        <TimelineItem title={'1月18日'} >
          中国人民抗日战争胜利日
          常常在想，尽管对这个国家有这样那样的抱怨，但我们可能的确生在了最好的时代
          铭记、感恩
          所有为中华民族浴血奋战的英雄将士
          永垂不朽
        </TimelineItem>
      </Timeline>
    </Container>
  }
})
