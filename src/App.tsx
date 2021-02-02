import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Quote from '../packages/quote/index'

export default defineComponent({
  setup () {
    const onClick = () => {
      console.log('我被点击了')
    }
    return () => <Container>
      <div style={{ height: '100px' }}></div>

      <Quote nm={true} leftColor={'#951251'} backgroundColor={'#f1c1f2'}>引用区域的文字</Quote>
    </Container>
  }
})
