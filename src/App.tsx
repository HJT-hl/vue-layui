import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Anim from '../packages/anim/index'

export default defineComponent({
  setup () {
    const a = ref(false)
    const trigger = () => {
      a.value = !a.value
    }
    return () => <Container>
      <Anim animate={'scaleSpring'} trigger={a.value} loop={true}>
        <div
          style={{ width: '100px', height: '100px', backgroundColor: 'pink' }}
          onClick={trigger}
        >
          {a.value ? 'true' : 'false'}
        </div>
      </Anim>
    </Container>
  }
})
