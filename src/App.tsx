import { defineComponent, h } from 'vue'
import Container from '../packages/container/index'
import Row from '../packages/row/index'
import Col from '../packages/col/index'

export default defineComponent({
  setup () {
    return () => <Container>
      <Row colSpace={10} style={{ background: '#eee' }}>
        <Col md={4} >
          <div style={{ background: '#63BA79', height: '60px' }}></div>
        </Col>
        <Col md={4}>
          <div style={{ background: '#63BA79', height: '60px' }}></div>
        </Col>
        <Col md={4} >
          <div style={{ background: '#63BA79', height: '60px' }}></div>
        </Col>
      </Row>
    </Container>
  }
})
