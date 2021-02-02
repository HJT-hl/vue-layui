import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Card from '../packages/card/index'

export default defineComponent({
  setup () {
    const onClick = () => {
      console.log('我被点击了')
    }
    const slots = {
      header: () => '字段集区块 - 默认风格',
      body: () => ' 内容区域'
    }
    return () => <Container>
      <div style={{ height: '100px' }}></div>
      <Card shadow={'hover'} v-slots={slots} bodyStyle={{ padding: '20px' }}></Card>
    </Container>
  }
})
