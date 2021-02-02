import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Collapse from '../packages/collapse/index'
import CollapseItem from '../packages/collapseItem/index'
export default defineComponent({
  setup () {
    const onClick = () => {
      console.log('我被点击了')
    }
    const slots = {
      header: () => '字段集区块 - 默认风格',
      body: () => ' 内容区域'
    }
    const a = ref('a')
    return () => <Container>
      <div style={{ height: '100px' }}></div>
      <Collapse v-model={[a,'a',["modifier"]]}>
        {a}
      </Collapse>
    </Container>
  }
})
