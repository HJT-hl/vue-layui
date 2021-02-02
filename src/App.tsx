import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Progress from '../packages/progress/index'

export default defineComponent({
  setup () {
    const onClick = () => {
      console.log('我被点击了')
    }
    return () => <Container>
      <div style={{ height: '100px' }}></div>
      <Progress value={0.5} isBig={false} showPercent={true} color={'#516161'}
                textStyle={{ fontSize: '20px', color: '#513153' }}/>
    </Container>
  }
})
