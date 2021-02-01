import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Button from '../packages/button/index'
import ButtonGroup from '../packages/buttonGroup/index'
import ButtonContainer from '../packages/buttonContainer/index'

export default defineComponent({
  setup () {
    const onClick = () => {
      console.log('我被点击了')
    }
    return () => <Container>
      <ButtonContainer>
        <Button onClick={onClick} >增加</Button>
        <Button onClick={onClick} >编辑</Button>
        <Button onClick={onClick} >删除</Button>
      </ButtonContainer>

    </Container>
  }
})
