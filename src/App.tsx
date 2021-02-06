import { defineComponent, h, ref, watchEffect } from 'vue'
import Container from '../packages/container/index'
import Slider from '../packages/slider/index'

export default defineComponent({
  setup () {
    const v = ref([10, 50])
    const t = ref(true)
    const color = ref('#5be22c')

    setInterval(() => {
      v.value = [10, 20]
    }, 3000)
    return () => <div>
      <Slider
        disabled={true}
        v-model={v.value}
        range={true}
        vertical={true}
        height={'600px'}
        tips={true}
        showstep={false}
        step={1}
        color={'#5be22c'}
        min={0}
        max={100}
        tipsColor={'#666'}
        textColor={'#eee'}
        onChange={(value: number | number[]) => {
          if (typeof value === 'number') {
            if (value < 70) color.value = '#5be22c'
            else if (value < 120) color.value = '#f8d90a'
            else color.value = '#f80a2e'
          }
        }}
      />
      <div>{v.value.toString()}</div>
    </div>
  }
})
