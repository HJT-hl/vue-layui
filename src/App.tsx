import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Field from '../packages/field/index'

export default defineComponent({
  setup () {
    const onClick = () => {
      console.log('我被点击了')
    }
    const slots = {
      title: () => '字段集区块 - 默认风格',
      content: () => ' 内容区域'
    }
    return () => <Container>
      <div style={{ height: '100px' }}></div>
      <Field isRow={true} v-slots={slots} marginLeft={'50%'}/>
    </Container>
  }
})
