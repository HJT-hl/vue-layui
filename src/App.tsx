import { defineComponent, h, ref, watchEffect } from 'vue'

import Page from '../packages/page'
import Icon from '../packages/icon'

export default defineComponent({
  setup () {
    const children = ['skyblue', '#009688', 'green', '#5FB878', 'pink']
    const curr = ref(3)
    const limit = ref(5)

    return () => <div style='width:800px;margin: 100px auto;'>
      <Page v-model={curr.value}
            count={100}
            groups={5}
            limit={limit.value}
            layout={['prev', 'page', 'next', 'count']}
            onJump={(curr: number) => {
              limit.value = curr
            }}
            onNext={(curr: number) => curr + 2}
            onPrev={(curr: number) => curr - 2}
            v-slots={{
              prev: () => <Icon
                icon="prev"
              />,
              next: () => <Icon
                icon="next"
              />,
              first: () => '首页',
              end: () => '末尾'
            }}
      >
      </Page>

    </div>
  }
})
