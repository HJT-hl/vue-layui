import { defineComponent, h } from 'vue'
import Container from '../packages/container/index'
import Icon from '../packages/icon/index'

export default defineComponent({
  setup () {
    return () => <Container>
      <Icon icon={'heart-fill'} size={40} color={'red'}/>
    </Container>
  }
})
