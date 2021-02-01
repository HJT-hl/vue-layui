import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Badge from '../packages/badge/index'

export default defineComponent({
  setup () {
    const onClick = () => {
      console.log('我被点击了')
    }
    return () => <Container>
      <Badge type={'rim'}>99+</Badge>

    </Container>
  }
})
