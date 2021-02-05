import { defineComponent, h, ref } from 'vue'
import Container from '../packages/container/index'
import Rate from '../packages/rate/index'

export default defineComponent({
  setup () {
    const v = ref(10.6)
    const c = ref(5)
    const text = ref('2星')
    // setInterval(() => {
    //   v.value++
    //   console.log(c.value)
    // }, 3000)
    return () => <Container>
      <div style={{ height: '200px', width: '200px', backgroundColor: 'pink' }}></div>
      <Rate v-model={v.value}
            allowHalf={true}
            max={20}
            count={c.value}
            text={text.value}
            showText={true}
            textColor='#912511'
            color='#000000'
            readonly={false}
            onHoverChange={(a) => {
              text.value = a + '星'
            }}
            onChange={console.log}
      />
    </Container>
  }
})
