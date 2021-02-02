import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Collapse from '../packages/collapse/index'
import CollapseItem from '../packages/collapseItem/index'

export default defineComponent({
  setup () {
    const onClick = (name: string|string[]) => {
      console.log(name)
    }
    const a = ref('1')
    return () => <Container>
      <div style={{ height: '100px' }}></div>
      <Collapse v-model={a.value} change={onClick}>
        <CollapseItem name={'1'} v-slots={{ title: () => <span>1</span>, content: () => '1' }}/>
        <CollapseItem name={'2'} v-slots={{ title: () => '2', content: () => '2' }}/>
        <CollapseItem name={'3'} v-slots={{ title: () => '3', content: () => '3' }}/>
      </Collapse>
    </Container>
  }
})
